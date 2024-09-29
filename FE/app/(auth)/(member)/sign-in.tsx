import Call from "../../../assets/svg/Call";
import Lock from "../../../assets/svg/Lock";
import Thrivia from "../../../assets/svg/Thrivia";
import CustomButton from "../../../components/CustomButton";
import FormLoader from "../../../components/FormLoader";
import InputField from "../../../components/InputField";
import { useAxiosInstance } from "../../../constants/axiosInstance";

import useAuthStore from "../../../store";
import * as SecureStore from "expo-secure-store";
import { Link, router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";

const SignIn = () => {
  const axiosInstance = useAxiosInstance();
  const {
    login,
    setUserUuid,
    setCooperativeUUID,
    setCooperativeName,
    SetCoopUniqueId,
    setCooperativeEmail,
  } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const savePassword = async (password: string) => {
    try {
      await SecureStore.setItemAsync("userPassword", password);
    } catch (error) {
      console.error("Error saving password:", error);
    }
  };

  const validateForm = () => {
    if (!form.email || !form.password) {
      Toast.show({
        type: "error",
        text1: "Please fill in all fields correctly.",
      });
      return false;
    }
    return true;
  };

  const onSignInPress = async () => {
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", {
        emailOrPhone: form.email,
        password: form.password,
      });

      const data = await res.data;

      if (data.accessToken) {
        Toast.show({
          type: "success",
          text1: `Login Successful!`,
        });

        const { accessToken, expiresIn, user } = data;
        login(accessToken, expiresIn, user);

        setUserUuid(user.uuid);
        const userActCoop = user?.activeCooperative;

        await savePassword(form.password);

        if (userActCoop) {
          setCooperativeUUID(userActCoop.uuid);
          setCooperativeName(userActCoop.name);
          SetCoopUniqueId(userActCoop.uniqueId);
          setCooperativeEmail(userActCoop.contactEmail);
          router.replace(
            `/(root)/(manager-tabs)/${user?.activeCooperative.uuid}`
          );
        } else {
          router.replace("/(root)/(tabs)/home");
        }
      }
    } catch (err) {
      Toast.show({
        type: "error",
        text1: `${err}`,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView className="relative h-full flex-1 bg-[#1d2128]">
      <View className="flex-1 items-center justify-center flex-col gap-8 bg-[#1d2128] mt-[60px]">
        <View>
          <Thrivia />
        </View>
        <View>
          <Text className="text-[16px] font-Onest pt-2 text-center text-white ">
            Welcome back! Let's thrive together!
          </Text>
        </View>
      </View>
      <View className="p-5 mt-8">
        <InputField
          placeholder={`Phone Number or Email`}
          icon={Call}
          value={form.email}
          keyboardType="email-address"
          onChangeText={(value: any) => setForm({ ...form, email: value })}
        />
        <InputField
          placeholder={`Password`}
          secureTextEntry={true}
          value={form.password}
          icon={Lock}
          keyboardType="default"
          onChangeText={(value: any) => setForm({ ...form, password: value })}
        />

        <View className="mt-[270px]">
          <CustomButton
            title="Log In"
            onPress={() => onSignInPress()}
            className="mt-6"
          />
          <View className="flex items-center justify-center mb-8">
            <Link
              href={"/(auth)/(member)/sign-up"}
              className="text-white text-[14px] font-Onest   "
            >
              <Text className="font-Onest">Don't have an account? </Text>
              <Text className="text-primary font-Onest">Create one</Text>
            </Link>
          </View>
        </View>
      </View>
      <Toast position="top" topOffset={100} />
      {loading && <FormLoader />}
    </ScrollView>
  );
};

export default SignIn;
