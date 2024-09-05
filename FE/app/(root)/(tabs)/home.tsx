import Homeprofile from "@/assets/svg/Homeprofile";
import Notification from "@/assets/svg/Notification";
import Settings from "@/assets/svg/Settings";
import Unsee from "@/assets/svg/Unsee";
import Swiper from "react-native-swiper";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import { publicBalance, publicBlDeets } from "@/constants";
import BgStyling from "@/assets/svg/BgStyling";
import CustomSideModal from "@/components/CustomSideModal";
import CustomButton from "@/components/CustomButton";
import { Link, useRouter } from "expo-router";
import useAuthStore from "@/store";

const Home = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === publicBalance.length - 1;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();

  const { logout, user, token, coopUUID } = useAuthStore();

  console.log(token, coopUUID);

  const handleLogout = async () => {
    logout();
    router.replace("/(auth)/(member)/sign-in");
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#1d2128]">
      <View className="p-4 pt-5 pb-12 flex-1">
        <View className="flex flex-row justify-between items-center">
          <View className="flex flex-row items-center gap-3">
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <Homeprofile />
            </TouchableOpacity>
            <View>
              <Text className="text-white/80 text-xl">Welcome,</Text>
              <Text className="text-white text-2xl font-semibold">
                Hi, {user ? user.firstName : ""}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={handleLogout}
            className="flex flex-row items-center gap-x-6"
          >
            <Notification />
            <Settings />
          </TouchableOpacity>
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
                <Text className="text-white text-[20px] font-[400]">
                  {item.title}
                </Text>
                <View className="py-4 flex flex-row items-center gap-3">
                  <Text className="text-white text-4xl font-bold tracking-widest">
                    {item.balance}
                  </Text>
                  <Unsee />
                </View>
                <Link href={"/(root)/(others)/add-money"}>
                  <LinearGradient
                    colors={["#F4F4F433", "#FFFFFF0B"]}
                    className="flex items-center justify-center border-[#E8E7E780] border rounded-full w-[148px] h-[44px]"
                  >
                    <Text className="text-white text-[18px]">
                      {item.action}
                    </Text>
                  </LinearGradient>
                </Link>
              </LinearGradient>
            ))}
          </Swiper>
        </View>
        {publicBlDeets.length > 0 ? (
          <View className="absolute top-[320px] w-full pl-4">
            <View className="flex-1 flex-row items-center justify-between border-b border-[#939090] pb-1 ">
              <Text className="text-white text-3xl font-semibold ">
                {publicBlDeets[activeIndex].title}
              </Text>
              <Text className="text-primary font-bold text-xl pl-12">
                View all
              </Text>
            </View>

            <View className="flex flex-col gap-y-6 mt-1">
              {publicBlDeets[activeIndex].data.map((item, index) => (
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
                    <Text className="text-white text-[20px] font-semibold ">
                      {item.type}
                    </Text>
                    <Text className="text-white pt-2 text-[16px]">
                      {item.time}
                    </Text>
                  </View>
                  <View className="">
                    <Text className="text-white text-right font-bold mt-[-30px] text-[18px]">
                      ₦{item.amount}
                    </Text>
                  </View>
                </LinearGradient>
              ))}
            </View>
          </View>
        ) : (
          <View className="absolute top-[470px] w-full pr-4 pl-10">
            <Text className="text-white text-xl text-center">
              {activeIndex === 0
                ? " You are yet to join a cooperative society. Click the button below to get started"
                : "Recent transitions on loan history will appear here"}
            </Text>
            <CustomButton
              title={
                activeIndex === 0
                  ? "Join a cooperative society"
                  : "Apply for a loan"
              }
              onPress={() =>
                activeIndex === 0
                  ? router.replace("/(auth)/(member)/(join)/become-memeber")
                  : ""
              }
              className="mt-6"
            />
          </View>
        )}
      </View>
      <CustomSideModal
        isVisible={isModalVisible}
        onClose={closeModal}
        title="Cooperative Societies"
      />
    </SafeAreaView>
  );
};

export default Home;
