import Homeprofile from "@/assets/svg/Homeprofile";
import Notification from "@/assets/svg/Notification";
import Settings from "@/assets/svg/Settings";
import Unsee from "@/assets/svg/Unsee";
import Swiper from "react-native-swiper";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import { managerBlDeets, publicBalance } from "@/constants";
import BgStyling from "@/assets/svg/BgStyling";
import CustomButton from "@/components/CustomButton";
import InviteModal from "@/components/InviteModal";
import { router, useLocalSearchParams } from "expo-router";
import useAuthStore from "@/store";
import CustomSideModal from "@/components/CustomSideModal";

const Home = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === publicBalance.length - 1;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSliderVisible, setIsSliderVisible] = useState(false);

  const { uuid } = useLocalSearchParams();

  const closeSlider = () => {
    setIsSliderVisible(false);
  };

  const onSubmit = () => {
    setIsModalVisible(true);
  };

  const {
    cooperativeName,
    logout,
    cooperativeUUID,
    copUniqueId,
  } = useAuthStore();
  console.log(cooperativeUUID);
  console.log("cooperative name", cooperativeName, copUniqueId);

  return (
    <SafeAreaView className="flex-1 bg-[#1d2128]">
      <View className="p-4 pt-5 pb-12 flex-1">
        <View className="flex flex-row justify-between items-center">
          <View className="flex flex-row items-center gap-3">
            <TouchableOpacity onPress={() => setIsSliderVisible(true)}>
              <Homeprofile />
            </TouchableOpacity>
            <View>
              <Text className="text-white/80 text-[16px]">Welcome,</Text>
              <Text className="hidden">Cooperative UUID: {uuid}</Text>
              <Text className="text-white text-[18px] pt-1 font-semibold">
                {cooperativeName || "your cooperative"}
              </Text>
            </View>
          </View>
          <View className="flex flex-row items-center gap-x-6">
            <TouchableOpacity onPress={() => logout()}>
              <Notification />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.replace("/(root)/(tabs)/home")}
            >
              <Settings />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-1 relative mt-8">
          <Swiper
            ref={swiperRef}
            loop={false}
            dot={
              <View
                className={`w-[30px] top-[-490px] h-[4px] mx-1 bg-[#939090] rounded-full`}
              />
            }
            activeDot={
              <View className="w-[70px] top-[-490px] h-[4px] mx-1 bg-white rounded-full" />
            }
            onIndexChanged={(index) => setActiveIndex(index)}
          >
            {publicBalance.map((item) => (
              <LinearGradient
                key={item.id}
                colors={
                  isLastSlide
                    ? ["#3C2A07", "#92822E", "#4C4611"]
                    : ["#073C36", "#2E9278", "#114C46"]
                }
                start={{ x: 0, y: 1.5 }}
                end={{ x: 1, y: 0 }}
                className="flex relative z-10 justify-center h-[160px] w-full rounded-[16px] p-4"
              >
                <View className="absolute top-0 z-50 right-[-180px] w-full ">
                  <BgStyling />
                </View>
                <Text className="text-white text-[14px] font-[400]">
                  {item.title}
                </Text>
                <View className="py-4 flex flex-row items-center gap-3">
                  <Text className="text-white text-[30px] font-bold tracking-widest">
                    {item.balance}
                  </Text>
                  <Unsee />
                </View>
                <LinearGradient
                  colors={["#F4F4F433", "#FFFFFF0B"]}
                  className="flex items-center justify-center border-[#E8E7E780] border rounded-full w-[148px] h-[44px]"
                >
                  <Text className="text-white text-[14px]">{item.action}</Text>
                </LinearGradient>
              </LinearGradient>
            ))}
          </Swiper>
        </View>

        {managerBlDeets[activeIndex].data.length < 1 ? (
          <View className="absolute top-[400px] flex items-center w-full pl-4">
            <Text className="text-white text-[16px] w-[200px] leading-[21px] text-center">
              You don&apos;t have any member in your cooperative society yet.{" "}
            </Text>
            <Text className="text-white text-[16px] w-[200px] leading-[21px] text-center pt-4 pb-6">
              Click the button below to get started
            </Text>
            <CustomButton title="Add members" onPress={onSubmit} />
          </View>
        ) : (
          <View className="absolute top-[320px] w-full pl-4">
            <View className="flex-1 flex-row items-center justify-between border-b border-[#939090] pb-1 ">
              <Text className="text-white text-[18px] font-semibold ">
                {managerBlDeets[activeIndex].title}
              </Text>
              <Text className="text-primary font-bold text-[16px] pl-12">
                View all
              </Text>
            </View>

            <View className="flex flex-col gap-y-6 mt-1">
              {managerBlDeets[activeIndex].data.map((item, index) => (
                <LinearGradient
                  key={index}
                  colors={["#F4F4F433", "#FFFFFF0B"]}
                  start={{ x: 0, y: 1.5 }}
                  end={{ x: 1, y: 0 }}
                  className="h-[70px] w-full p-[16px] border-[#E8E7E780] border rounded-[8px] flex justify-between"
                >
                  <View
                    className={`absolute top-[20px] left-3 ${
                      index % 2 === 0 ? "bg-red-500" : "bg-green-500"
                    }  rounded-full`}
                  >
                    <item.icon />
                  </View>
                  <View className="ml-7">
                    <Text className="text-white text-[14px] font-semibold ">
                      {item.type}
                    </Text>
                    <Text className="text-white pt-2 text-[14px]">
                      {item.time}
                    </Text>
                  </View>
                  <View className="">
                    <Text className="text-white text-right font-bold mt-[-30px] text-[16px]">
                      ₦{item.amount}
                    </Text>
                  </View>
                </LinearGradient>
              ))}
            </View>
          </View>
        )}
      </View>
      <InviteModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
      <CustomSideModal
        isVisible={isSliderVisible}
        onClose={closeSlider}
        title="Cooperative Societies"
      />
    </SafeAreaView>
  );
};

export default Home;
