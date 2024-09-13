import Thrivia from "@/assets/svg/Thrivia";
import CircleProgress from "@/components/CircleProgress";

import CustomButton from "@/components/CustomButton";
import CustomModal from "@/components/CustomModal";
import FormLoader from "@/components/FormLoader";
import StageOne from "@/components/joinStages/StageOne";
import StageTwo from "@/components/joinStages/StageTwo";
import { useAxiosInstance } from "@/constants/axiosInstance";
import useAuthStore from "@/store";

import { router } from "expo-router";

import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

const JoinStages = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const { user, token, cooperativeName } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    uniqueID: "",
    memberNum: "",
    fullName: `${user.firstName}${user.lastName}`,
    date: "",
    address: "",
    email: user.email,
    phoneNumber: user.phoneNumber,
  });
  const axiosInstance = useAxiosInstance();

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

  const [isModalVisible, setIsModalVisible] = useState(0);

  const showModal = (num: number) => {
    setIsModalVisible(num);
  };

  const onSubmit = async () => {
    console.log(user, token, form.date);

    const date = new Date(form.date);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    setLoading(true);
    try {
      const res = await axiosInstance.post(
        "/users/cooperative-application",
        {
          uniqueId: form.uniqueID,
          membershipNo: `${form.memberNum}`,
          fullName: form.fullName,
          dateOfBirth: formattedDate,
          phoneNumber: `${form.phoneNumber}`,
          email: form.email,
          address: form.address,
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

      Toast.show({
        type: "success",
        text1: `Account was created successfully`,
        position: "top",
        topOffset: 100,
      });
      setIsModalVisible(2);
    } catch (err) {
      console.log(err);
      setIsModalVisible(0);
      Toast.show({
        type: "error",
        text1: `${err}`,
        position: "top",
        topOffset: 100,
      });
    } finally {
      setLoading(false);
    }
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
            Join a Cooperative
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
              currentStage === 2 ? showModal(1) : nextStage();
            }}
          />

          {currentStage > 1 && (
            <TouchableOpacity
              onPress={prevStage}
              className={`w-full p-3 mb-5 rounded-full flex flex-row justify-center items-center h-[44px] border border-white`}
            >
              <Text className="text-white">Previous</Text>
            </TouchableOpacity>
          )}
          {currentStage < 2 && (
            <TouchableOpacity
              onPress={() => router.push("/(root)/(tabs)/home")}
              className={`w-full p-3 mb-5 rounded-full flex flex-row justify-center items-center h-[44px] border border-white`}
            >
              <Text className="text-white">Go home</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Toast position="top" topOffset={100} />
      {loading && <FormLoader />}
      <CustomModal
        isVisible={isModalVisible === 1}
        onClose={closeModal}
        OnNext={() => onSubmit()}
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
        OnNext={() => router.replace("/(root)/(tabs)/home")}
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
