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
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import ArrowBack from "@/assets/svg/ArrowBack";
import Toast from "react-native-toast-message";
import useAuthStore from "@/store";
import * as SecureStore from "expo-secure-store";

const Withdraw = () => {
  const [banks, setBanks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const axiosInstance = useAxiosInstance();
  const { walletUuid } = useAuthStore();
  const [password, setPassword] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [form, setForm] = useState({
    accountNumber: "",
    accountName: "",
    bankName: "",
    bankCode: "",
    amount: "",
    purpose: "",
  });

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

  const handlepurposeChange = (value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      purpose: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !form.bankName ||
      !form.accountNumber ||
      !form.accountName ||
      !form.amount ||
      !form.purpose
    ) {
      Toast.show({
        type: "error",
        text1: "Incomplete details",
        text2: "Please fill in all fields before proceeding.",
      });
      return;
    }
    setShowPasswordModal(true); // Show password modal for confirmation
  };

  const { uuid } = useLocalSearchParams();

  const confirmWithdrawal = async () => {
    try {
      const savedPassword = await SecureStore.getItemAsync("userPassword");

      if (savedPassword !== password) {
        Toast.show({
          type: "error",
          text1: "Incorrect Password",
          text2: "Please try again.",
        });
        return;
      }
      await axiosInstance.post(`/users/wallets/${uuid}/withdrawal-request`, {
        bankName: form.bankName,
        accountName: form.accountName,
        accountNumber: form.accountNumber,
        amount: parseFloat(form.amount),
        purpose: form.purpose,
        bankCode: form.bankCode,
      });

      setShowPasswordModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      setError("Failed to process withdrawal request");
      Toast.show({
        type: "error",
        text1: `${error}`,
      });
      setShowPasswordModal(false);
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
        <Text className="text-white ml-3 text-2xl  ">Withdraw</Text>
      </TouchableOpacity>
      <View className="mb-10">
        <Text className="text-white text-center text-[15px]">
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
          placeholder="Purpose for withdrawal"
          value={form.purpose}
          onChangeText={handlepurposeChange}
          icon={Help}
        />
        {error && <Text style={{ color: "red" }}>{error}</Text>}
        <View className="mt-20">
          <CustomButton title="Proceed" onPress={handleSubmit} />
        </View>
      </View>

      <CustomModal
        isVisible={showPasswordModal}
        onButtonPress={() => setShowPasswordModal(false)}
        OnNext={confirmWithdrawal}
        buttonText="Confirm"
        buttonTextCancel="Cancel"
        title="Enter Password"
        message="Please enter your password to confirm the withdrawal."
        UI={
          <View className="mt-6 flex flex-row ">
            <TextInput
              className="rounded-full text-[15px] font-Onest text-black flex-1 focus:outline-none border border-gray-600 pl-4 h-11"
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>
        }
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
