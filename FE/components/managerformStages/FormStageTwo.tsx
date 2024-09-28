/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import InputField from "../InputField";
import SelectBank from "../../assets/svg/SelectBank";
import OneTwoThree from "../../assets/svg/OneTwoThree";
import AccountName from "../../assets/svg/AccountName";
import Dropdown from "../Dropdown";
import { useAxiosInstance } from "../../constants/axiosInstance";
import { Text } from "react-native";

interface FormStageTwoProps {
  form: any;
  setForm: (value: any) => void;
  onSubmit: () => void;
}

const FormStageTwo: React.FC<FormStageTwoProps> = ({ form, setForm }) => {
  const [banks, setBanks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const axiosInstance = useAxiosInstance();

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axiosInstance.get("/wallets/banks");
        const bankList = response.data.map((bank: any) => ({
          name: bank.name,
          code: bank.code,
        }));

        setBanks(bankList);
      } catch (error) {
        console.error("Error fetching banks:", error);
        setError("Failed to load banks");
      }
    };

    fetchBanks();
  }, [axiosInstance]);

  const setSelectedBank = (value: string) => {
    const selectedBank = banks.find((bank) => bank.name === value);
    setForm({ ...form, selectBank: value, bankCode: selectedBank?.code || "" });
  };

  const verifyAccountNumber = async () => {
    if (form.accountNumber.length === 10 && form.bankCode) {
      setIsVerifying(true);
      setIsVerified(false);
      try {
        const response = await axiosInstance.post(
          "/wallets/verify-bank-details",
          {
            bankCode: form.bankCode,
            accountNumber: form.accountNumber,
          }
        );

        if (response.data?.account_name) {
          setForm({ ...form, accName: response.data.account_name });
          setError(null);
          setIsVerified(true);
        } else {
          setError("Account name not found");
          setIsVerified(false);
        }
      } catch (error) {
        console.error("Error verifying account number:", error);
        setError("Invalid account number or bank.");
        setForm({ ...form, accName: "" });
        setIsVerified(false);
      } finally {
        setIsVerifying(false);
      }
    } else {
      setError("Account number must be exactly 10 digits");
    }
  };

  useEffect(() => {
    if (form.accountNumber.length === 10) {
      verifyAccountNumber();
    }
  }, [form.accountNumber, form.bankCode]);

  const handleAccountNumberChange = (value: string) => {
    if (/^\d{0,10}$/.test(value)) {
      setForm({ ...form, accountNumber: value });
    }
  };

  return (
    <>
      <Dropdown
        placeholder="Select Bank"
        value={form.selectBank}
        options={banks.map((bank) => bank.name)}
        onSelect={setSelectedBank}
        icon={SelectBank}
      />
      <InputField
        placeholder="Account number"
        icon={OneTwoThree}
        value={form.accountNumber}
        keyboardType="number-pad"
        onChangeText={handleAccountNumberChange}
      />
      {form.accountNumber.length < 10 && !isVerifying && !isVerified && (
        <Text className="text-amber-500">
          Account number must be exactly 10 digits
        </Text>
      )}
      {isVerifying && <Text className="text-gray-500">Verifying...</Text>}
      {isVerified && <Text className="text-green-500">Account Verified</Text>}
      <InputField
        placeholder="Account name"
        icon={AccountName}
        value={form.accName}
        keyboardType="default"
        editable={false}
      />
      {error && <Text className="text-red-500">{error}</Text>}
    </>
  );
};

export default FormStageTwo;
