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
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";
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

  const { token, login, setUserUuid } = useAuthStore();

  useEffect(() => {
    let isMounted = true;
    if (token && isMounted) {
      router.replace("/(root)/(tabs)/home");
    }
    return () => {
      isMounted = false;
    };
  }, [token]);
  const savePassword = async (password: string) => {
    try {
      await SecureStore.setItemAsync("userPassword", password);
    } catch (error) {
      console.error("Error saving password:", error);
    }
  };
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[0-9]).{8,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = () => {
    if (
      !form.email ||
      !form.createPassword ||
      !form.firstName ||
      !form.lastName ||
      !form.phoneNumber
    ) {
      Toast.show({
        type: "error",
        text1: "Please fill in all fields correctly.",
      });
      return false;
    }

    if (!validatePassword(form.createPassword)) {
      Toast.show({
        type: "error",
        text1: "Number(s) and at least 8 characters for password",
      });
      return false;
    }

    return true;
  };
  const onSignUpPress = async () => {
    if (!validateForm()) {
      return; // If validation fails, do not proceed
    }
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
      });

      const data = res.data;

      if (data.accessToken) {
        Toast.show({
          type: "success",
          text1: `Login Successful!`,
        });
        const { accessToken, expiresIn, user } = data;
        setUserUuid(user.uuid);
        login(accessToken, expiresIn, user);
        await savePassword(form.createPassword);
        router.replace("/(root)/(tabs)/home");
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
    <SafeAreaView className="h-full flex-1 pt-[60px] bg-[#1d2128] relativ">
      <ScrollView>
        <View className="flex-1 items-center justify-center flex-col gap-4 bg-[#1d2128] mt-[40px]">
          <View>
            <Thrivia />
          </View>
          <View>
            <Text className="text-[16px] font-Onest pt-2 text-center text-white ">
              To get started with us, create a free account
            </Text>
          </View>
        </View>
        <View>
          <View className="px-5 pt-[30px]">
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
              keyboardType="email-address"
              onChangeText={(value) => setForm({ ...form, email: value })}
            />
            <InputField
              placeholder={`Phone Number`}
              icon={Call}
              value={form.phoneNumber}
              keyboardType="number-pad"
              onChangeText={(value) => setForm({ ...form, phoneNumber: value })}
            />
            <InputField
              placeholder={`Create Password`}
              secureTextEntry={true}
              value={form.createPassword}
              icon={Lock}
              onChangeText={(value) =>
                setForm({ ...form, createPassword: value })
              }
            />
            <InputField
              placeholder={`Confirm Password`}
              secureTextEntry={true}
              icon={Lock}
              value={form.confirmPassword}
              onChangeText={(value) =>
                setForm({ ...form, confirmPassword: value })
              }
            />

            <CustomButton
              title="Create account"
              onPress={() => onSignUpPress()}
              className="mt-6"
            />

            <View className="flex items-center justify-center mb-8">
              <Link
                href={"/(auth)/(member)/sign-in"}
                className="text-white text-[14px] font-Onest   "
              >
                <Text className="font-Onest">Already have an account? </Text>
                <Text className="text-primary font-Onest">Log in</Text>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
      <Toast position="top" topOffset={100} />
      {loading && <FormLoader />}
    </SafeAreaView>
  );
};

export default SignUp;
