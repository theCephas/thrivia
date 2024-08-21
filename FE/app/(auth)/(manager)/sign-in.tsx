import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import { Link } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignIn = () => {
  const [form, setForm] = useState({
    phoneNumber: "",
    password: "",
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
            Welcome back!
          </Text>
          <Text className="text-xl pt-2 text-center text-white ">
            Let's thrive together
          </Text>
        </View>
      </View>
      <View className="p-5">
        <InputField
          placeholder={`Phone Number`}
          icon={icons.call}
          value={form.phoneNumber}
          onChangeText={(value) => setForm({ ...form, phoneNumber: value })}
        />
        <InputField
          placeholder={`Create Password`}
          secureTextEntry={true}
          value={form.password}
          icon={icons.lock}
          onChangeText={(value) => setForm({ ...form, password: value })}
        />

        <View className="mt-[270px]">
          <CustomButton
            title="Log In"
            // onPress={onSignUpPress}
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
    </ScrollView>
  );
};

export default SignIn;
