import Call from "@/assets/svg/Call";
import Lock from "@/assets/svg/Lock";
import Thrivia from "@/assets/svg/Thrivia";
import CustomButton from "@/components/CustomButton";
import FormLoader from "@/components/FormLoader";
import InputField from "@/components/InputField";
import { useAxiosInstance } from "@/constants/axiosInstance";
import useAuthStore from "@/store";

import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";

const SignIn = () => {
  const axiosInstance = useAxiosInstance();
  const { login, token } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", {
        emailOrPhone: form.email,
        password: form.password,
      });

      const data = await res.data;

      console.log(data);

      if (data.accessToken) {
        Toast.show({
          type: "success",
          text1: `Login Successful!`,
        });
        const { accessToken, expiresIn, user, cooperative } = data;
        console.log(user.uuid);
        login(accessToken, expiresIn, user);
        router.replace("/(root)/(tabs)/home");
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
          <Thrivia />
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
          placeholder={`Phone Number or Email`}
          icon={Call}
          value={form.email}
          keyboardType="email-address"
          onChangeText={(value) => setForm({ ...form, email: value })}
        />
        <InputField
          placeholder={`Password`}
          secureTextEntry={true}
          value={form.password}
          icon={Lock}
          keyboardType="default"
          onChangeText={(value) => setForm({ ...form, password: value })}
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
