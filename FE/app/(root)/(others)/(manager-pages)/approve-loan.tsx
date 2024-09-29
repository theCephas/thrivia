import ArrowBack from "../../../../assets/svg/ArrowBack";
import ApproveStageOne from "../../../../components/approveLoanStages/ApproveStageOne";
import ApproveStageTwo from "../../../../components/approveLoanStages/ApproveStageTwo";
import CustomButton from "../../../../components/CustomButton";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ApproveLoan = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [form, setForm] = useState({
    selectedStructure: "",
    selectedDate: "",
  });

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
  const [, setIsModalVisible] = useState(false);

  const onSubmit = () => {
    setIsModalVisible(true);
  };

  return (
    <View className="h-full bg-[#1d2128]">
      <TouchableOpacity
        onPress={() => router.back()}
        className="mt-14 py-6 px-4 fixed w-full bg-[#0D1015]"
      >
        <ArrowBack />
        <Text className="text-white text-center mt-[-21px] text-2xl  ">
          Approve loan request
        </Text>
      </TouchableOpacity>

      <View className="flex-row items-center justify-between border-b border-[#939090] pt-6 pb-2 mx-4 ">
        <Text className="text-white text-[15px] font-Onest font-[500] ">
          Complete the following to approve request
        </Text>
      </View>

      <View className="p-5">
        {currentStage === 1 && (
          <ApproveStageOne form={form} setForm={setForm} />
        )}
        {currentStage === 2 && (
          <ApproveStageTwo form={form} setForm={setForm} />
        )}

        <View className="mt-[120px]">
          {currentStage < 2 && (
            <CustomButton title="Proceed" onPress={nextStage} />
          )}
          {currentStage === 2 && (
            <CustomButton title="Approve" onPress={onSubmit} />
          )}
          <TouchableOpacity
            onPress={prevStage}
            className={`w-full p-3 mb-5 rounded-full flex flex-row justify-center items-center h-[44px] border border-white`}
          >
            <Text className="text-white">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ApproveLoan;
