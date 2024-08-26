import ArrowDown from "@/assets/svg/ArrowDown";
import BgStyling from "@/assets/svg/BgStyling";
import Unsee from "@/assets/svg/Unsee";
import CustomButton from "@/components/CustomButton";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Finance = () => {
  const [activeNav, setActiveNav] = useState(0);
  const router = useRouter();

  return (
    <SafeAreaView className="h-full bg-[#1d2128] w-full flex flex-col justify-between">
      <View className="w-full">
        <Text className="text-white text-2xl font-bold mt-6 py-6 w-full items-center bg-[#0D1015] text-center">
          Finances
        </Text>

        <View className="w-full flex flex-row justify-between px-28">
          {["Loans", "Savings"].map((text, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setActiveNav(i)}
              className="pt-8 flex flex-col items-center"
            >
              <Text className={`text-white text-xl px-3`}>{text}</Text>

              <View
                className={`h-1 mt-1 w-full bg-primary rounded-t-[50px] transition-opacity duration-500 ${
                  activeNav === i ? "opacity-100" : "opacity-0"
                }`}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View className="w-full px-4 mt-4 ">
          <LinearGradient
            colors={["#3C2A07", "#92822E", "#4C4611"]}
            start={{ x: 0, y: -0.5 }}
            end={{ x: 0.2, y: 2 }}
            className="flex relative justify-center w-full rounded-[16px] p-4 overflow-hidden"
          >
            <View className="absolute top-0 z-50 right-0">
              <BgStyling />
            </View>
            <Text className="text-white text-[20px] font-[400]">
              Loan balance
            </Text>
            <View className="py-4 flex flex-row items-center gap-3">
              <Text className="text-white text-4xl font-bold tracking-widest">
                ₦0.00
              </Text>
              <Unsee />
            </View>
            <TouchableOpacity
              onPress={() => {}}
              className="flex flex-row items-center"
            >
              <Text className="text-white text-lg font-bold pr-1">
                Transaction history
              </Text>
              <View className="-rotate-90 scale-90">
                <ArrowDown />
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View className="px-4 flex flex-row">
          <CustomButton
            title="Proceed"
            onPress={() =>
              router.replace("/(auth)/(member)/(join)/join-stages")
            }
            className=""
          />
          <TouchableOpacity
            className={`w-full p-3 mb-5 rounded-full flex flex-row justify-center items-center h-[44px] border border-white`}
            onPress={() => router.replace("/(root)/(tabs)/home")}
          >
            <Text className="text-white">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Finance;
