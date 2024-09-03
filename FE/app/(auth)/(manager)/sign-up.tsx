import Call from "@/assets/svg/Call";
import Email from "@/assets/svg/Email";
import Lock from "@/assets/svg/Lock";
import Thrivia from "@/assets/svg/Thrivia";
import User from "@/assets/svg/User";

import CustomButton from "@/components/CustomButton";
import FormLoader from "@/components/FormLoader";
import InputField from "@/components/InputField";
import { useAxiosInstance } from "@/constants/axiosInstance";
import useAuthStore from "@/store";

import { Link, router } from "expo-router";

import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";

const SignUp = () => {
  const axiosInstance = useAxiosInstance();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    createPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const { token, login } = useAuthStore();

  useEffect(() => {
    if (token) {
      token.manager
        ? router.replace("/(auth)/(manager)/(registerstages)/registerstages")
        : token.member
        ? router.replace("/(root)/(tabs)/home")
        : "";
    }
  }, [token]);

  const onSignUpPress = async () => {
    setLoading(true);
    try {
      if (form.createPassword !== form.confirmPassword)
        throw new Error("Passwords don't match");

      const res = await axiosInstance.post("/users", {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phoneNumber: `${form.phoneNumber}`,
        password: form.createPassword,
        role: "MANAGER",
      });
      console.log("res = ", res);

      const data = await res.data;

      if (data.accessToken) {
        Toast.show({
          type: "success",
          text1: `Account was created successfully`,
        });

        const { accessToken, expiresIn, user } = data;
        login({ manager: accessToken }, expiresIn, user);
      }
      // router.replace("/(auth)/(manager)/(registerstages)/registerstages");
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
    <ScrollView className="flex-1 bg-[#1d2128]">
      <View className="flex-1 items-center justify-center flex-col gap-8 bg-[#1d2128] mt-[60px]">
        <View>
          <Thrivia />
        </View>
        <View>
          <Text className="text-3xl font-bold text-center text-white">
            Create Your Account
          </Text>
          <Text className="text-xl pt-2 text-center text-white ">
            To get started with us, create a free account
          </Text>
        </View>
      </View>
      <View className="p-5">
        <InputField
          placeholder={`First Name`}
          icon={User}
          value={form.firstName}
          keyboardType="default"
          onChangeText={(value) => setForm({ ...form, firstName: value })}
        />
        <InputField
          placeholder={`Last Name`}
          icon={User}
          value={form.lastName}
          keyboardType="default"
          onChangeText={(value) => setForm({ ...form, lastName: value })}
        />
        <InputField
          placeholder={`Email`}
          icon={Email}
          value={form.email}
          keyboardType="email-address"
          onChangeText={(value) => setForm({ ...form, email: value })}
        />
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
          value={form.createPassword}
          icon={Lock}
          onChangeText={(value) => setForm({ ...form, createPassword: value })}
        />
        <InputField
          placeholder={`Confirm Password`}
          secureTextEntry={true}
          icon={Lock}
          value={form.confirmPassword}
          onChangeText={(value) => setForm({ ...form, confirmPassword: value })}
        />

        <CustomButton
          title="Create account"
          onPress={onSignUpPress}
          className="mt-6"
        />

        <View className="flex items-center justify-center mb-8">
          <Link
            href={"/(auth)/(manager)/sign-in"}
            className="text-white text-[16px] font-bold"
          >
            Already have an account?{" "}
            <Text className="text-primary">Log in</Text>
          </Link>
        </View>
      </View>
      <Toast position="top" topOffset={100} />
      {loading && <FormLoader />}
    </ScrollView>
  );
};

export default SignUp;
