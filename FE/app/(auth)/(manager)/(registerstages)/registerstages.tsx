import Thrivia from "@/assets/svg/Thrivia";
import CircleProgress from "@/components/CircleProgress";

import CustomButton from "@/components/CustomButton";
import CustomModal from "@/components/CustomModal";
import FormLoader from "@/components/FormLoader";
import FormStageOne from "@/components/managerformStages/FormStageOne";
import FormStageTwo from "@/components/managerformStages/FormStageTwo";
import { useAxiosInstance } from "@/constants/axiosInstance";

import { router } from "expo-router";

import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

const RegisterStages = () => {
  const axiosInstance = useAxiosInstance();
  const [currentStage, setCurrentStage] = useState(1);
  const [form, setForm] = useState({
    coopName: "",
    businessRegNumber: "",
    businessAddress: "",
    email: "",
    phoneNumber: "",
    businessName: "",
    businessType: "",
    accountNumber: "",
    accName: "",
    selectBank: "Access bank",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

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
      const res = await axiosInstance.post("/cooperatives", {
        name: form.coopName,
        regNo: `${form.businessRegNumber}`,
        address: form.businessAddress,
        contactEmail: form.email,
        contactPhone: `${form.phoneNumber}`,
        bankName: form.selectBank,
        accountNo: `${form.accountNumber}`,
        accountName: form.accName,
      });

      // console.log(res);

      const data = await res.data;

      // console.log(data);

      setIsModalVisible(true);
    } catch (err) {
      Toast.show({
        type: "error",
        text1: `${err}`,
      });
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 h-full relative bg-[#1d2128]">
      <View className="flex-1 items-centejustify-center flex-col gap-8 bg-[#1d2128] mt-[8px]">
        <View className="flex flex-row justify-between px-5">
          <Thrivia width={130} height={130} />
          <CircleProgress stage={currentStage} totalStages={2} />
        </View>
        <View>
          <Text className="text-xl w-[298px] font-[500] m-auto text-center text-white ">
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
        message="You have successfully registered your cooperative. Kindly proceed to add  members to your cooperative by giving them the ID below to register with"
        id="COOP-789098"
        buttonText="Copy ID"
        buttonTextCancel="Cancel"
        onButtonPress={closeModal}
      />
    </ScrollView>
  );
};

export default RegisterStages;
