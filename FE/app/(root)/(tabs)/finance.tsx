import ArrowBack from "@/assets/svg/ArrowBack";
import ArrowDown from "@/assets/svg/ArrowDown";
import BgStyling from "@/assets/svg/BgStyling";
import Unsee from "@/assets/svg/Unsee";
import CustomButton from "@/components/CustomButton";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Finance = () => {
  const [activeNav, setActiveNav] = useState(0);
  const [viewAllTrans, setViewAllTrans] = useState(true);
  const router = useRouter();

  return (
    <SafeAreaView className="h-full bg-[#1d2128] w-full flex flex-col ">
      <View className={`w-full bg-[#0D1015] mt-6 py-6`}>
        {viewAllTrans ? (
          <Text className="text-white text-2xl font-bold w-full items-center  text-center">
            Finances
          </Text>
        ) : (
          <TouchableOpacity
            onPress={() => setViewAllTrans(true)}
            className="w-full flex flex-row items-center gap-6 pl-4"
          >
            <ArrowBack />
            <Text className="text-white text-2xl font-bold">
              Transaction history
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {viewAllTrans && (
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
      )}
      {viewAllTrans && (
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
      )}
      {viewAllTrans && (
        <View className="px-4 flex flex-row justify-between mt-4">
          <CustomButton
            title="Repay loan"
            onPress={() =>
              router.replace("/(auth)/(member)/(join)/join-stages")
            }
            className="w-[48%]"
          />
          <TouchableOpacity
            className={`w-[48%] mb-5 rounded-full  border border-white overflow-hidden`}
            onPress={() => router.replace("/(root)/(tabs)/home")}
          >
            <LinearGradient
              colors={[
                "rgba(244, 244, 244, 0.2)",
                "rgba(255, 255, 255, 0.044)",
              ]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              className="w-full flex flex-row justify-center items-center"
            >
              <Text className="text-white text-lg font-bold p-3">
                Apply for loan
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
      <View className="px-4 w-full mt-8">
        <View className="border-b border-gray-50 pb-2 flex flex-row justify-between">
          <Text className="text-white text-lg font-bold">
            {viewAllTrans ? "Loan history" : "Loan transactions"}
          </Text>
          {viewAllTrans && (
            <TouchableOpacity onPress={() => setViewAllTrans(false)}>
              <Text className="text-primary font-bold text-lg">View all</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Finance;
