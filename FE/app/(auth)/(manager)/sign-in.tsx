import Call from "@/assets/svg/Call";
import Lock from "@/assets/svg/Lock";
import CustomButton from "@/components/CustomButton";
import FormLoader from "@/components/FormLoader";
import InputField from "@/components/InputField";
import { useAxiosInstance } from "@/constants/axiosInstance";
import useAuthStore from "@/store";

import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";

const SignIn = () => {
  const axiosInstance = useAxiosInstance();
  const [form, setForm] = useState({
    phoneNumber: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { login, token } = useAuthStore();

  useEffect(() => {
    if (token) {
      token.manager
        ? router.replace("/(root)/(manager-tabs)/home")
        : token.member
        ? router.replace("/(root)/(tabs)/home")
        : "";
    }
  }, [token]);

  const onSignUpPress = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", {
        emailOrPhone: form.phoneNumber,
        password: form.password,
        role: "MANAGER",
      });

      const data = res.data;

      if (data.accessToken) {
        Toast.show({
          type: "success",
          text1: `Login Successful!`,
        });

        const { accessToken, expiresIn, user } = data;
        login({ member: accessToken }, expiresIn, user);
      }
    } catch (err) {
      Toast.show({
        type: "error",
        text1: `${err}`,
      });
      // console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView className="relative h-full flex-1 bg-[#1d2128]">
      <View className="flex-1 items-center justify-center flex-col gap-8 bg-[#1d2128] mt-[60px]">
        <View>
          <Image source={require("@/assets/images/thrivia.png")} className="" />
        </View>
        <View>
          <Text className="text-3xl font-bold text-center text-white">
            Welcome back!
          </Text>
          <Text className="text-xl pt-2 text-center text-white ">
            Let's thrive together
          </Text>
        </View>
      </View>
      <View className="p-5 mt-8">
        <InputField
          placeholder={`Phone Number`}
          icon={Call}
          value={form.phoneNumber}
          keyboardType="phone-pad"
          onChangeText={(value) => setForm({ ...form, phoneNumber: value })}
        />
        <InputField
          placeholder={`Create Password`}
          secureTextEntry={true}
          value={form.password}
          icon={Lock}
          onChangeText={(value) => setForm({ ...form, password: value })}
        />

        <View className="mt-[270px]">
          <CustomButton
            title="Log In"
            onPress={onSignUpPress}
            className="mt-6"
          />
          <View className="flex items-center justify-center mb-8">
            <Link
              href={"/(auth)/(manager)/sign-up"}
              className="text-white text-[16px] font-bold"
            >
              Don't have an account?{" "}
              <Text className="text-primary">Create one</Text>
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
