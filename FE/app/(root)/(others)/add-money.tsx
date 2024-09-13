import ArrowBack from "@/assets/svg/ArrowBack";
import Homeprofile from "@/assets/svg/Homeprofile";
import CustomButton from "@/components/CustomButton";
import PaymentInputField from "@/components/PaymentInputField";
import useAuthStore from "@/store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import Monnify from "@adsesugh/monnify-react-native";
import FormLoader from "@/components/FormLoader";
import { useAxiosInstance } from "@/constants/axiosInstance";
import Success from "@/assets/svg/Success";

const AddMoney = () => {
  const router = useRouter();
  const { role } = useLocalSearchParams();
  const [value, setValue] = useState<number>(200.0);
  const { cooperativeName, user, cooperativeEmail, token } = useAuthStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxiosInstance();
  console.log(token);

  const paymentParameters = {
    amount: value,
    currency: "NGN",
    reference: `${Date.now()}`,
    customerFullName: `${role === "MANAGER" ? cooperativeName : user.name}`,
    customerEmail: `${role === "MANAGER" ? cooperativeEmail : user.email}`,
    apiKey: "MK_PROD_GSXRRTTKLT",
    contractCode: "896041207144",
    paymentDescription: "Payment for savings",
    mode: "LIVE",
  };

  const onSuccess = async (response: any) => {
    console.log("Payment Successful:", response);
    setLoading(true);
    try {
      const { transactionReference, authorizedAmount } = response;
      const { data } = await axiosInstance.post(
        `/cooperatives/verify-transaction/${transactionReference}`
      );
      // Check if the verification was successful
      if (data.amount) {
        return (
          <SafeAreaView className="h-full bg-[#1d2128] w-full flex flex-col justify-center items-center">
            <View className="flex flex-col">
              <View className=" flex flex-row items-center gap-x-4 justify-center">
                <Text className="text-white text-[20px]">
                  Deposit Successful!
                </Text>
                <Success width={40} height={40} />
              </View>
              <View className="mt-6 flex flex-row items-center justify-center">
                <Text className="text-white text-base">
                  NGN {authorizedAmount}
                </Text>
              </View>
              <View className="mt-10">
                <CustomButton
                  title="Done"
                  className="w-full"
                  onPress={() => router.replace("/(root)/(tabs)/home")}
                />
              </View>
            </View>
          </SafeAreaView>
        );
      } else {
        // Handle verification failure (if needed)
        Alert.alert("Error", "Transaction verification failed.");
      }
    } catch (error) {
      console.error("Verification Error:", error);
      Alert.alert(
        "Error",
        "An error occurred while verifying the transaction."
      );
    } finally {
      setLoading(false);
    }
  };

  const onError = (response: any) => {
    console.log("Payment Failed:", response);
    Alert.alert("Payment Failed", "The payment could not be completed.");
  };

  const onDismiss = () => {
    setModalVisible(!modalVisible);
  };

  const handleProceed = () => {
    if (value === null || value <= 199.99) {
      Alert.alert("Invalid Amount", "Please enter a valid amount.");
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
          <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
            {role === "MANAGER" ? cooperativeName : user.firstName} Savings
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
      {loading && <FormLoader />}
    </SafeAreaView>
  );
};

export default AddMoney;
