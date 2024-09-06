import Thrivia from "@/assets/svg/Thrivia";
import CircleProgress from "@/components/CircleProgress";
import CustomButton from "@/components/CustomButton";
import CustomModal from "@/components/CustomModal";
import FormLoader from "@/components/FormLoader";
import FormStageOne from "@/components/managerformStages/FormStageOne";
import FormStageTwo from "@/components/managerformStages/FormStageTwo";
import { useAxiosInstance } from "@/constants/axiosInstance";
import useAuthStore from "@/store";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import * as Clipboard from "expo-clipboard"; // Clipboard API
import { router } from "expo-router";
import axios from "axios";

const RegisterStages = () => {
  const axiosInstance = useAxiosInstance();
  const [currentStage, setCurrentStage] = useState(1);
  const [form, setForm] = useState({
    coopName: "",
    businessRegNumber: "",
    businessAddress: "",
    email: "",
    phoneNumber: "",
    accountNumber: "",
    accName: "",
    selectBank: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    token,

    setCoopUUID,
    setUniqueId,
    coopUniqueId,
  } = useAuthStore();

  console.log(token);

  const nextStage = () => {
    if (currentStage < 2) {
      setCurrentStage(currentStage + 1);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      console.log("Token being sent in headers:", token);
      const res = await axiosInstance.post(
        "/cooperatives",
        {
          name: form.coopName,
          regNo: `${form.businessRegNumber}`,
          address: form.businessAddress,
          contactEmail: form.email,
          contactPhone: `${form.phoneNumber}`,
          bankName: form.selectBank,
          accountNo: `${form.accountNumber}`,
          accountName: form.accName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const data = res.data;
      console.log("Response data", data);

      // Show a success toast
      Toast.show({
        type: "success",
        text1: `Account was created successfully`,
        position: "top", // ensure proper positioning
        topOffset: 100, // adjust as necessary
      });

      // Set necessary data in the store

      setCoopUUID(data.uuid);
      setUniqueId(data.uniqueId);
      setIsModalVisible(true);
    } catch (err) {
      console.error("Error during registration:", err);

      Toast.show({
        type: "error",
        position: "top",
        topOffset: 100,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyId = async () => {
    if (coopUniqueId) {
      await Clipboard.setStringAsync(coopUniqueId);
      Toast.show({
        type: "success",
        text1: "ID copied to clipboard",
      });
    }
  };

  const handleGoHome = () => {
    setIsModalVisible(false);
    router.replace(`/(root)/(tabs)/home`);
  };

  return (
    <ScrollView className="flex-1 h-full relative bg-[#1d2128]">
      <View className="flex-1 items-center justify-center flex-col w-full gap-8 bg-[#1d2128] mt-[8px]">
        <View className="flex flex-row justify-between w-full px-5">
          <View className="ml-5">
            <Thrivia width={130} height={130} />
          </View>
          <CircleProgress stage={currentStage} totalStages={2} />
        </View>
        <View>
          <Text className="text-xl w-[298px] font-[500] m-auto text-center text-white">
            To proceed, register your cooperative business
          </Text>
        </View>
      </View>
      <View className="p-5">
        {currentStage === 1 && <FormStageOne form={form} setForm={setForm} />}

        {currentStage === 2 && (
          <FormStageTwo form={form} setForm={setForm} onSubmit={onSubmit} />
        )}

        <View className={` ${currentStage === 2 ? "mt-[200px]" : "mt-20"}`}>
          {currentStage < 2 && (
            <CustomButton title="Proceed" onPress={nextStage} />
          )}
          {currentStage === 2 && (
            <CustomButton title="Register" onPress={onSubmit} />
          )}
          <TouchableOpacity
            onPress={() => router.back()}
            className={`w-full p-3 mb-5 rounded-full flex flex-row justify-center items-center h-[44px] border border-white`}
          >
            <Text className="text-white">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast position="top" topOffset={100} />
      {loading && <FormLoader />}

      <CustomModal
        isVisible={isModalVisible}
        onClose={closeModal}
        title="Registration Successful"
        message="You have successfully registered your cooperative. Kindly proceed to add members to your cooperative by giving them the ID below to register with"
        id={coopUniqueId}
        buttonText="Copy ID"
        buttonTextCancel="Go Home"
        onButtonPress={handleGoHome} // Copy ID when "Copy ID" button is pressed
        OnNext={handleCopyId} // Go home when "Go Home" is pressed
      />
    </ScrollView>
  );
};

export default RegisterStages;
