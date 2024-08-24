import Arrowright from "@/assets/svg/Arrowright";
import Call from "@/assets/svg/Call";
import Email from "@/assets/svg/Email";
import Lock from "@/assets/svg/Lock";
import User from "@/assets/svg/User";
import user from "@/assets/svg/User";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { Icons } from "@/constants";

import { Link, router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignUp = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    createPassword: "",
    confirmPassword: "",
  });

  // const onSignUpPress = async () => {};
  return (
    <ScrollView className="flex-1 bg-[#1d2128]">
      <View className="flex-1 items-center justify-center flex-col gap-8 bg-[#1d2128] mt-[60px]">
        <View>
          <Image source={require("@/assets/images/thrivia.png")} className="" />
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
          onPress={() => router.push("/(root)/(tabs)/home")}
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
