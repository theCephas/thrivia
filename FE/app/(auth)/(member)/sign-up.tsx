import Call from "@/assets/svg/Call";
import Email from "@/assets/svg/Email";
import Lock from "@/assets/svg/Lock";
import Thrivia from "@/assets/svg/Thrivia";
import User from "@/assets/svg/User";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import axiosInstance from "@/constants/axiosInstance";
import useAuthStore from "@/store";

import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

const SignUp = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    createPassword: "",
    confirmPassword: "",
  });

  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) router.replace("/(root)/(tabs)/home");
  }, [isLoggedIn]);

  const onSignUpPress = async () => {
    // console.log(form);
    try {
      if (form.createPassword !== form.confirmPassword)
        throw new Error("Passwords don't match");
      const res = await axiosInstance.post("/users", {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phoneNumber: form.phoneNumber,
        password: form.createPassword,
      });

      // console.log(res.data);
      router.replace("/(auth)/(member)/sign-in");
    } catch (err) {
      console.log(err);
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
          onChangeText={(value) => setForm({ ...form, firstName: value })}
        />
        <InputField
          placeholder={`Last Name`}
          icon={User}
          value={form.lastName}
          onChangeText={(value) => setForm({ ...form, lastName: value })}
        />
        <InputField
          placeholder={`Email`}
          icon={Email}
          value={form.email}
          onChangeText={(value) => setForm({ ...form, email: value })}
        />
        <InputField
          placeholder={`Phone Number`}
          icon={Call}
          value={form.phoneNumber}
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
          // onPress={() => {router.push("/(root)/(tabs)/home")}}
          onPress={() => onSignUpPress()}
          className="mt-6"
        />

        <View className="flex items-center justify-center mb-8">
          <Link
            href={"/(auth)/(member)/sign-in"}
            className="text-white text-[16px] font-bold"
          >
            Already have an account?{" "}
            <Text className="text-primary">Log in</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
