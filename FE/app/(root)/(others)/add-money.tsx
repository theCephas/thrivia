import ArrowBack from "@/assets/svg/ArrowBack";
import Homeprofile from "@/assets/svg/Homeprofile";
import CustomButton from "@/components/CustomButton";
import PaymentInputField from "@/components/PaymentInputField";
import useAuthStore from "@/store";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Monnify from "@adsesugh/monnify-react-native";

const AddMoney = () => {
  const router = useRouter();
  const [value, setValue] = useState<number>(0);
  const { cooperativeName } = useAuthStore();
  const [modalVisible, setModalVisible] = useState(false);

  const paymentParameters = {
    amount: value,
    currency: "NGN",
    reference: `${Date.now()}`,
    customerFullName: "John Doe",
    customerEmail: "admin@gmail.com",
    customerMobileNumber: "08012345689",
    apiKey: "MK_PROD_GSSGSHTTKLT",
    contractCode: "8960152607144",
    paymentDescription: "Payment for goods",
    mode: "TEST",
  };

  const onSuccess = (response: any) => {
    console.log("Payment Successful:", response);
  };

  const onError = (response: any) => {
    console.log("Payment Failed:", response);
  };

  const onDismiss = () => {
    setModalVisible(!modalVisible);
  };

  const handleProceed = () => {
    if (value === null || value <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    setModalVisible(true);
  };

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
            {cooperativeName} Savings
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
      <Monnify
        paymentParams={paymentParameters}
        onSuccess={onSuccess}
        onError={onError}
        onDismiss={onDismiss}
        visible={modalVisible}
      />
    </SafeAreaView>
  );
};

export default AddMoney;
