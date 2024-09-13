import InputField from "@/components/InputField";
import Dropdown from "@/components/Dropdown";
import CustomButton from "@/components/CustomButton";
import CustomModal from "@/components/CustomModal";
import React, { useState, useEffect } from "react";
import SelectBank from "@/assets/svg/SelectBank";
import OneTwoThree from "@/assets/svg/OneTwoThree";
import AccountName from "@/assets/svg/AccountName";
import Coins from "@/assets/svg/Coins";
import Help from "@/assets/svg/Help";
import { useAxiosInstance } from "@/constants/axiosInstance";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import ArrowBack from "@/assets/svg/ArrowBack";
import Toast from "react-native-toast-message";
import useAuthStore from "@/store";

const Withdraw = () => {
  const [banks, setBanks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const axiosInstance = useAxiosInstance();
  const { walletUuid } = useAuthStore(); // Get user UUID from auth store
  const [form, setForm] = useState({
    accountNumber: "",
    accountName: "",
    bankName: "",
    bankCode: "",
    amount: "",
    reason: "",
  });
  console.log(walletUuid);

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
        setError("Failed to load banks");
      }
    };

    fetchBanks();
  }, []);

  const setSelectedBank = (value: string) => {
    const selectedBank = banks.find((bank) => bank.name === value);
    setForm((prevForm) => ({
      ...prevForm,
      bankName: value,
      bankCode: selectedBank?.code || "",
    }));
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
          setForm((prevForm) => ({
            ...prevForm,
            accountName: response.data.account_name, // Use correct field name
          }));
          setError(null);
          setIsVerified(true);
        } else {
          setError("Account name not found");
          setIsVerified(false);
        }
      } catch (error) {
        setError("Invalid account number or bank.");
        setForm((prevForm) => ({
          ...prevForm,
          accountName: "",
        }));
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
      setForm((prevForm) => ({
        ...prevForm,
        accountNumber: value,
      }));
    }
  };

  const handleAmountChange = (value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      amount: value, // Keep amount as a string in state
    }));
  };

  const handleReasonChange = (value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      reason: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !form.bankName ||
      !form.accountNumber ||
      !form.accountName ||
      !form.amount ||
      !form.reason
    ) {
      Toast.show({
        type: "error",
        text1: "Incomplete details",
        text2: "Please fill in all fields before proceeding.",
      });
      return;
    }
    setShowConfirmationModal(true);
  };

  const { uuid } = useLocalSearchParams();
  console.log(uuid);

  const confirmWithdrawal = async () => {
    try {
      await axiosInstance.post(`/users/wallets/${uuid}/withdrawal-request`, {
        bankName: form.bankName,
        accountName: form.accountName, // Ensure proper field names
        accountNumber: form.accountNumber,
        amount: parseFloat(form.amount),
        reason: form.reason,
        bankCode: form.bankCode,
      });
      setShowConfirmationModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      setError("Failed to process withdrawal request");
      Toast.show({
        type: "error",
        text1: `${error}`,
      });
      setShowConfirmationModal(false);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    router.back();
  };

  return (
    <ScrollView className="flex h-full w-full bg-[#1d2128]">
      <TouchableOpacity
        onPress={() => router.replace("/(root)/(tabs)/home")}
        className="flex flex-row justify-center mt-12 mb-10 py-6 w-full items-center bg-[#0D1015]"
      >
        <ArrowBack />
        <Text className="text-white ml-3 text-2xl font-bold">Withdraw</Text>
      </TouchableOpacity>
      <View className="mb-10">
        <Text className="text-white text-center text-[18px]">
          Withdraw funds out of your wallet
        </Text>
      </View>
      <View className="px-5">
        <Dropdown
          placeholder="Select Bank"
          value={form.bankName}
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
          <Text style={{ color: "orange" }}>
            Account number must be exactly 10 digits
          </Text>
        )}
        {isVerifying && <Text style={{ color: "gray" }}>Verifying...</Text>}
        {isVerified && <Text style={{ color: "green" }}>Account Verified</Text>}
        <InputField
          placeholder="Account name"
          icon={AccountName}
          value={form.accountName} // Use accountName here
          keyboardType="default"
          editable={false}
        />
        <InputField
          placeholder="Amount"
          value={form.amount ? form.amount.toString() : ""} // Convert amount to string for display
          icon={Coins}
          keyboardType="numeric"
          onChangeText={handleAmountChange}
        />
        <InputField
          placeholder="Reason for withdrawal"
          value={form.reason}
          onChangeText={handleReasonChange}
          icon={Help}
        />
        {error && <Text style={{ color: "red" }}>{error}</Text>}
        <View className="mt-20">
          <CustomButton title="Proceed" onPress={handleSubmit} />
        </View>
      </View>

      {/* Confirmation Modal */}
      <CustomModal
        isVisible={showConfirmationModal}
        onButtonPress={() => setShowConfirmationModal(false)}
        OnNext={confirmWithdrawal}
        buttonText="Confirm"
        buttonTextCancel="Cancel"
        title="Confirm Withdrawal"
        message={`Are you sure you want to withdraw ${form.amount} from your account?`}
      />

      {/* Success Modal */}
      <CustomModal
        isVisible={showSuccessModal}
        onButtonPress={closeSuccessModal}
        buttonTextCancel="Cancel"
        title="Success"
        message="Your withdrawal request has been successfully processed."
      />

      {/* Toast Notification */}
      <Toast position="top" topOffset={100} />
    </ScrollView>
  );
};

export default Withdraw;
