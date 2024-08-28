import Arrowright from "@/assets/svg/Arrowright";
import Faqs from "@/assets/svg/Faqs";
import FinanceProfile from "@/assets/svg/FinanceProfle";
import Help from "@/assets/svg/Help";
import LogOut from "@/assets/svg/LogOut";
import Membership from "@/assets/svg/Membership";
import ReferNEarn from "@/assets/svg/RefernEarn";
import User from "@/assets/svg/User";
import UserPic from "@/assets/svg/UserPic";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, Text, View } from "react-native";

const Profile = () => {
  return (
    <View className="h-full bg-[#1d2128]">
      <View className="mt-14 py-6 px-4 fixed w-full bg-[#0D1015]">
        <Text className="text-white text-center text-2xl font-bold">
          Profile
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        className="h-full "
      >
        <View className="mx-4 pt-12 pb-8">
          <LinearGradient
            colors={["#F4F4F433", "#FFFFFF0B"]}
            className="rounded-[8px] w-full h-[82px] p-3 border border-[#E8E7E780] flex flex-col gap-y-[18px] pt-0 "
          >
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-row items-center gap-x-2">
                <View className="bg-[#DDDDDD] w-[40px] h-[40px] flex items-center justify-center rounded-full ">
                  <UserPic />
                </View>
                <View>
                  <Text className="text-white text-[16px]">Victor Idowu</Text>
                  <Text className="text-white text-[14px] pt-[10px]">
                    FC298-19
                  </Text>
                </View>
              </View>
              <View className="w-[81px] h-[20px] flex items-center justify-center bg-[#f4f4f4] rounded-full ">
                <Text className="text-primary text-[10px]">Active member</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
        <View className="mx-4 pt-4">
          <Text className="text-white text-[18px] font-[500] mb-8">
            Account details
          </Text>
          <LinearGradient
            colors={["#F4F4F433", "#FFFFFF0B"]}
            className="rounded-[8px] w-full h-[204px] p-3 border border-[#E8E7E780] flex flex-col gap-y-[18px] pt-0 "
          >
            <View className="flex flex-row justify-between items-center pb-2 border-b border-[#939090] px-2">
              <View className="flex flex-row items-center">
                <User />
                <Text className="text-white text-[14px] ml-4">
                  Personal info
                </Text>
              </View>
              <Arrowright />
            </View>
            <View className="flex flex-row justify-between items-center pb-2 border-b border-[#939090] px-2">
              <View className="flex flex-row items-center">
                <Membership />
                <Text className="text-white text-[14px] ml-4">
                  Membership details
                </Text>
              </View>
              <Arrowright />
            </View>
            <View className="flex flex-row justify-between items-center pb-2 border-b border-[#939090] px-2">
              <View className="flex flex-row items-center">
                <FinanceProfile />
                <Text className="text-white text-[14px] ml-4">
                  Financial information
                </Text>
              </View>
              <Arrowright />
            </View>
            <View className="flex flex-row justify-between items-center px-2">
              <View className="flex flex-row items-center">
                <ReferNEarn />
                <Text className="text-white text-[14px] ml-4">
                  Refer and earn
                </Text>
              </View>
              <Arrowright />
            </View>
          </LinearGradient>
        </View>

        <View className="mx-4 pt-8">
          <Text className="text-white text-[18px] font-[500] mb-8">
            Help and support
          </Text>
          <LinearGradient
            colors={["#F4F4F433", "#FFFFFF0B"]}
            className="rounded-[8px] w-full h-[159px] p-4 border border-[#E8E7E780] flex flex-col gap-y-[18px] pt-0 "
          >
            <View className="flex flex-row justify-between items-center pb-2 border-b border-[#939090] px-2">
              <View className="flex flex-row items-center">
                <Help />
                <Text className="text-white text-[14px] ml-4">Help center</Text>
              </View>
              <Arrowright />
            </View>
            <View className="flex flex-row justify-between items-center pb-2 border-b border-[#939090] px-2">
              <View className="flex flex-row items-center">
                <Faqs />
                <Text className="text-white text-[14px] ml-4">FAQs</Text>
              </View>
              <Arrowright />
            </View>
            <View className="flex flex-row justify-between items-center px-2">
              <View className="flex flex-row items-center">
                <LogOut />
                <Text className="text-white text-[14px] ml-4">Log out</Text>
              </View>
              <Arrowright />
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
};
export default Profile;
