import ArrowBack from "@/assets/svg/ArrowBack";
import Homeprofile from "@/assets/svg/Homeprofile";
import CustomButton from "@/components/CustomButton";
import PaymentInputField from "@/components/PaymentInputField";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

const AddMoney = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  return (
    <SafeAreaView className="h-full bg-[#1d2128] w-full flex flex-col justify-between">
      <View>
        <TouchableOpacity
          onPress={() => router.replace("/(root)/(tabs)/home")}
          className="flex flex-row justify-center mt-14 py-6 w-full items-center bg-[#0D1015]"
        >
          <ArrowBack />
          <Text className="text-white ml-3 text-2xl font-bold">Add money</Text>
        </TouchableOpacity>
        <View className="flex flex-col gap-4 items-center px-14 mt-6">
          <Homeprofile />
          <Text className="text-white text-xl text-center">
            Freedom Cooperation monthly contribution
          </Text>
        </View>
        <PaymentInputField
          value={value}
          setValue={setValue}
          focusOnInit={true}
        />
      </View>
      <View className="w-full px-8">
        <CustomButton
          title="Proceed"
          // onPress={onSignUpPress}
          className="mb-8"
        />
      </View>
    </SafeAreaView>
  );
};

export default AddMoney;
