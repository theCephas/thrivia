import Thrivia from "@/assets/svg/Thrivia";
import CircleProgress from "@/components/CircleProgress";

import CustomButton from "@/components/CustomButton";
import CustomModal from "@/components/CustomModal";
import StageOne from "@/components/joinStages/StageOne";
import StageTwo from "@/components/joinStages/StageTwo";

import { router } from "expo-router";

import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const JoinStages = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [form, setForm] = useState({
    fullName: "",
    date: "",
    address: "",
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

  const [isModalVisible, setIsModalVisible] = useState(0);

  const onSubmit = (num: number) => {
    setIsModalVisible(num);
  };

  const closeModal = () => {
    setIsModalVisible(0);
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
            Become a member of Freedom Cooperative
          </Text>
        </View>
      </View>
      <View className="p-5">
        {currentStage === 1 && <StageOne form={form} setForm={setForm} />}

        {currentStage === 2 && <StageTwo form={form} setForm={setForm} />}

        <View className={` ${currentStage === 2 ? "mt-[200px]" : "mt-20"}`}>
          <CustomButton
            title="Proceed"
            onPress={() => {
              currentStage === 2 ? onSubmit(1) : nextStage();
            }}
          />

          <TouchableOpacity
            onPress={() =>
              router.replace("/(auth)/(member)/(join)/become-memeber")
            }
            className={`w-full p-3 mb-5 rounded-full flex flex-row justify-center items-center h-[44px] border border-white`}
          >
            <Text className="text-white">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
      <CustomModal
        isVisible={isModalVisible === 1}
        onClose={closeModal}
        OnNext={() => onSubmit(2)}
        title="Submit application"
        message="Kindly ensure that all data was provided correctly before submitting your application.
 You can't edit an application once it's submitted"
        buttonText="Submit application"
        buttonTextCancel="Cancel"
        onButtonPress={closeModal}
      />
      <CustomModal
        isVisible={isModalVisible === 2}
        onClose={closeModal}
        OnNext={() => onSubmit(0)}
        title="Application completed!"
        message="Your application has his forwarded to the directors of Freedom Cooperative for further review."
        buttonText="Cancel"
        buttonTextCancel=""
        onButtonPress={closeModal}
      />
    </ScrollView>
  );
};

export default JoinStages;
