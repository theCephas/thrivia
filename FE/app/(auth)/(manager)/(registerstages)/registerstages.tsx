import Thrivia from "@/assets/svg/Thrivia";
import CircleProgress from "@/components/CircleProgress";

import CustomButton from "@/components/CustomButton";
import CustomModal from "@/components/CustomModal";
import FormStageOne from "@/components/FormStageOne";
import FormStageTwo from "@/components/FormStageTwo";

import { Link, router } from "expo-router";

import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const RegisterStages = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [form, setForm] = useState({
    coopName: "",
    businessRegNumber: "",
    businessAddress: "",
    email: "",
    phoneNumber: "",
    businessName: "",
    businessType: "",
    password: "",
    confirmPassword: "",
  });

  const nextStage = () => {
    if (currentStage < 2) {
      setCurrentStage(currentStage + 1);
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const onSubmit = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
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
            className={`w-full p-3 mb-5 rounded-full flex flex-row justify-center items-center h-[44px] border border-white`}
          >
            <Link href={"/(auth)/(manager)/sign-in"}>
              <Text className="text-white">Cancel</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </View>
      <CustomModal
        isVisible={isModalVisible}
        onClose={closeModal}
        title="Registration Successful"
        message="You have successfully registered your cooperative. Kindly proceed to add  members to your cooperative by giving them the ID below to register with"
        id="COOP-789098"
        buttonText="Share Invite"
        buttonTextCancel="Cancel"
        onButtonPress={closeModal}
      />
    </ScrollView>
  );
};

export default RegisterStages;
