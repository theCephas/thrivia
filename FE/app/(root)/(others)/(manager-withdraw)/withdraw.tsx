import ArrowBack from "../../../../assets/svg/ArrowBack";
import Homeprofile from "../../../../assets/svg/Homeprofile";
import CustomButton from "../../../../components/CustomButton";
import FormLoader from "../../../../components/FormLoader";
import PaymentInputField from "../../../../components/PaymentInputField";
import useAuthStore from "../../../../store";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput } from "react-native";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { useAxiosInstance } from "../../../../constants/axiosInstance";
import Toast from "react-native-toast-message";
import CustomModal from "../../../../components/CustomModal";

const Withdraw = () => {
  const [value, setValue] = useState<number>(50);
  const [loading, setLoading] = useState(false);
  const { cooperativeName, cooperativeUUID } = useAuthStore();

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState<string>("");
  const axiosInstance = useAxiosInstance();
  const handleProceed = () => {
    if (value === null || value <= 40) {
      Alert.alert("Invalid Amount", "Please enter a valid amount.");
      return;
    }
    setShowPasswordModal(true);
  };
  const { uuid } = useLocalSearchParams();
  const handleWithdraw = async () => {
    setLoading(true);
    try {
      const savedPassword = await SecureStore.getItemAsync("userPassword");
      if (savedPassword !== password) {
        Toast.show({
          type: "info",
          text1: "Incorrect Password",
          text2: "Please try again.",
        });
        return;
      }

      const response = await axiosInstance.post(
        `/cooperatives/${cooperativeUUID}/wallets/${uuid}/withdraw`,
        {
          amount: value,
        }
      );

      if (response.status === 200) {
        Toast.show({ type: "success", text1: "Withdrawal successful!" });

        router.replace(`/(root)/(manager-tabs)/${cooperativeUUID}`);
      } else {
        Toast.show({ type: "error", text1: "Withdrawal successful!" });
      }
    } catch (error) {
      console.error(error);
      Toast.show({ type: "error", text1: `${error}` });
    } finally {
      setLoading(false);
      setShowPasswordModal(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-[#1d2128] w-full flex flex-col justify-between">
      <View>
        <TouchableOpacity
          onPress={() => router.replace("/(root)/(tabs)/home")}
          className="flex flex-row justify-center mt-6 py-6 w-full items-center bg-[#0D1015]"
        >
          <ArrowBack />
          <Text className="text-white ml-3 text-2xl font-Onest ">
            Withdraw money
          </Text>
        </TouchableOpacity>
        <View className="flex flex-col gap-4 items-center px-14 mt-6">
          <Homeprofile />
          <Text
            className="font-Onest"
            style={{ color: "white", fontSize: 18, textAlign: "center" }}
          >
            {cooperativeName}
          </Text>
        </View>
        <PaymentInputField
          value={value}
          setValue={(num) => setValue(Number(num))}
          focusOnInit={true}
        />
      </View>

      <View className="w-full px-8">
        <CustomButton
          title="Proceed"
          onPress={handleProceed}
          className="mb-8"
        />
      </View>

      {loading && <FormLoader />}

      <CustomModal
        isVisible={showPasswordModal}
        onButtonPress={() => setShowPasswordModal(false)}
        OnNext={handleWithdraw}
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
      <Toast />
    </SafeAreaView>
  );
};

export default Withdraw;
