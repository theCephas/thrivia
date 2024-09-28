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
import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";

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
    bankCode: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    token,

    setCoopUUID,
    setUniqueId,
    coopUniqueId,
    coopUUID,
    setCooperativeName,
    setCooperativeUUID,
    SetCoopUniqueId,
    cooperativeUUID,
    user,
    setUser,
  } = useAuthStore();

  const nextStage = () => {
    if (currentStage < 2) {
      setCurrentStage(currentStage + 1);
    }
  };

  const prevStage = () => {
    if (currentStage > 1) {
      setCurrentStage(currentStage - 1);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        "/cooperatives",
        {
          name: form.coopName,
          regNo: `${form.businessRegNumber}`,
          address: form.businessAddress,
          contactEmail: form.email,
          contactPhone: `${form.phoneNumber}`,
          bankName: form.selectBank,
          bankCode: form.bankCode,
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

      Toast.show({
        type: "success",
        text1: `Account was created successfully`,
        position: "top",
        topOffset: 100,
      });
      setCoopUUID(data.uuid);
      setUniqueId(data.uniqueId);
      axiosInstance.post("/users/set-active-cooperative", {
        coopUuid: data.uuid,
      });
      setCooperativeUUID(data.uuid);
      setCooperativeName(data.name);
      setUser({ ...user, activeCooperative: data });
      SetCoopUniqueId(data.uniqueId);
      setIsModalVisible(true);
    } catch (err) {
      console.error("Error during registration:", err);

      Toast.show({
        type: "error",
        text1: `${err}`,
        topOffset: 100,
        position: "top",
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
      // setIsModalVisible(false);
      router.replace(`/(root)/(manager-tabs)/${cooperativeUUID}`);
    }
  };

  const handleGoHome = () => {
    if (coopUUID) {
      setIsModalVisible(false);

      router.replace(`/(root)/(manager-tabs)/${cooperativeUUID}`);
    }
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
          <Text className="text-[16px] font-Onest w-[298px] font-[500] m-auto text-center text-white">
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
            <CustomButton title="Next" onPress={nextStage} />
          )}
          {currentStage === 2 && (
            <CustomButton title="Register" onPress={onSubmit} />
          )}
          {currentStage > 1 && (
            <TouchableOpacity
              onPress={prevStage}
              className={`w-full p-3 mb-5 rounded-full flex flex-row justify-center items-center h-[44px] border border-white`}
            >
              <Text className="text-white font-Onest text-[14px]">
                Previous
              </Text>
            </TouchableOpacity>
          )}
          {currentStage < 2 && (
            <TouchableOpacity
              onPress={() => router.push("/(root)/(tabs)/home")}
              className={`w-full p-3 mb-5 rounded-full flex flex-row justify-center items-center h-[44px] border border-white`}
            >
              <Text className="text-white font-Onest">Go home</Text>
            </TouchableOpacity>
          )}
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
        onButtonPress={handleGoHome}
        OnNext={handleCopyId}
      />
    </ScrollView>
  );
};

export default RegisterStages;
