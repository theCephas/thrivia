import Thrivia from "../../../../assets/svg/Thrivia";
import ApplyStageOne from "../../../../components/applyLoanStages/ApplyStageOne";
import ApplyStageThree from "../../../../components/applyLoanStages/ApplyStageThree";
import ApplyStageTwo from "../../../../components/applyLoanStages/ApplyStageTwo";
import CircleProgress from "../../../../components/CircleProgress";

import CustomButton from "../../../../components/CustomButton";
import CustomModal from "../../../../components/CustomModal";

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
    amount: "",
    purpose: "",
    term: "",
    sourceOfIncome: "",
    employmentDetails: "",
    bankInfo: "",
  });

  const nextStage = () => {
    if (currentStage < 3) {
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
      <View className="flex items-centejustify-center flex-col gap-4 bg-[#1d2128] mt-[8px]">
        <View className="flex flex-row justify-between px-5">
          <Thrivia width={130} height={130} />
          <CircleProgress stage={currentStage} totalStages={3} />
        </View>
        <View>
          <Text className="text-2xl   m-auto text-center text-white ">
            Need funds on the go?
          </Text>
          <Text className="text-center text-lg font-Onest text-white px-14">
            Apply for a loan with Freedom Cooperative to get started
          </Text>
        </View>
      </View>
      <View className="p-5">
        <Text className="text-white text-lg font-Onest  ">
          {currentStage === 1
            ? "Personal details"
            : currentStage === 2
            ? "Loan details"
            : "Financial information"}
        </Text>
        {currentStage === 1 && <ApplyStageOne form={form} setForm={setForm} />}

        {currentStage === 2 && <ApplyStageTwo form={form} setForm={setForm} />}
        {currentStage === 3 && (
          <ApplyStageThree form={form} setForm={setForm} />
        )}
        <View className={` ${currentStage === 1 ? "mt-20" : "mt-[150px]"}`}>
          <CustomButton
            title="Proceed"
            onPress={() => {
              // eslint-disable-next-line no-unused-expressions
              currentStage === 3 ? onSubmit(1) : nextStage();
            }}
          />

          <TouchableOpacity
            onPress={() => router.replace("/(root)/(tabs)/finance")}
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
        title="Submit application?"
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
