import BgStyling from "@/assets/svg/BgStyling";
import LoanBg from "@/assets/svg/LoanBg";
import Unsee from "@/assets/svg/Unsee";
import CustomButton from "@/components/CustomButton";
import { financeLoanHistory } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Finance = () => {
  const [activeTab, setActiveTab] = useState("Loans");
  return (
    <View className="flex-1 bg-[#1d2128]">
      <View className="p-10 pt-16 flex flex-row items-center justify-center gap-[100px]">
        <TouchableOpacity onPress={() => setActiveTab("Loans")}>
          <Text
            className={`text-white font-semibold text-[18px] ${
              activeTab === "Loans"
                ? "text-white/80 border-b-2 border-primary w-[50px] text-center pb-[2px]"
                : "text-white border-none pb-[2px]"
            }`}
          >
            Loans
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("Savings")}>
          <Text
            className={`text-white font-semibold text-[18px] ${
              activeTab === "Savings"
                ? "text-white/80 border-b-2 border-primary w-[50px] text-center pb-[2px]"
                : "text-white border-none pb-[2px]"
            }`}
          >
            Savings
          </Text>
        </TouchableOpacity>
      </View>

      <View className="w-full">
        {activeTab === "Loans" ? (
          <View className="">
            <View className="flex items-center px-4">
              <LinearGradient
                colors={["#3C2A07", "#92822E", "#4C4611"]}
                // colors={
                //   isLastSlide
                //     ? ["#3C2A07", "#92822E", "#4C4611"]
                //     : ["#073C36", "#2E9278", "#114C46"]

                start={{ x: 0, y: 1.5 }}
                end={{ x: 1, y: 0 }}
                className="flex relative justify-center w-full h-[108px] rounded-[16px] p-4"
              >
                <View className="absolute top-[2px]  right-[-167.5px] w-full ">
                  <LoanBg />
                </View>
                <Text className="text-white text-[20px] font-[400]">
                  Loan Balance
                </Text>
                <View className="py-4 flex flex-row items-center gap-3">
                  <Text className="text-white text-4xl font-bold tracking-widest">
                    ₦300,000
                  </Text>
                  <Unsee />
                </View>
              </LinearGradient>
            </View>
            <View className="flex items-center mt-6 my-4">
              <CustomButton
                onPress={() => router.push("/(manager-pages)/loan-requests")}
                title="View loan requests"
                className="w-[310px]"
              />
            </View>

            <View className="flex-row items-center justify-between border-b border-[#939090] pb-1 mx-4 ">
              <Text className="text-white text-[18px] font-semibold ">
                Loan History
              </Text>
              <Text className="text-primary font-bold text-xl pl-12">
                View all
              </Text>
            </View>

            <ScrollView
              contentContainerStyle={{ paddingBottom: 700 }}
              className="h-full "
            >
              <View className="flex h-full flex-col gap-y-6 p-4 ">
                {financeLoanHistory.map((item, index) => (
                  <LinearGradient
                    key={index}
                    colors={["#F4F4F433", "#FFFFFF0B"]}
                    start={{ x: 0, y: 1.5 }}
                    end={{ x: 1, y: 0 }}
                    className="h-[70px] w-full p-[16px] border-[#E8E7E780] border rounded-[8px] flex flex-row justify-between"
                  >
                    <View>
                      <Text className="text-white text-[20px] font-semibold ">
                        {item.type}
                      </Text>
                      <Text className="text-white pt-2 text-[16px]">
                        {item.time}
                      </Text>
                    </View>
                    <View className="flex flex-row justify-between items-center">
                      <Text className="text-white flex items-center justify-center font-bold text-[18px]">
                        {item.action}
                      </Text>
                      <View className="">
                        <item.icon />
                      </View>
                    </View>
                  </LinearGradient>
                ))}
              </View>
            </ScrollView>
          </View>
        ) : (
          <View>
            <Text className="text-white">Savings</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Finance;
