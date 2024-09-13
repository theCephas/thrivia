import Homeprofile from "@/assets/svg/Homeprofile";
import Notification from "@/assets/svg/Notification";
import Settings from "@/assets/svg/Settings";
import Unsee from "@/assets/svg/Unsee";
import Swiper from "react-native-swiper";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { publicBalance, publicBlDeets } from "@/constants";
import BgStyling from "@/assets/svg/BgStyling";
import CustomSideModal from "@/components/CustomSideModal";
import CustomButton from "@/components/CustomButton";
import { Link, router, useRouter } from "expo-router";
import useAuthStore from "@/store";
import useFetchCoop from "@/constants/useFetchCoop";
import SwitchAccounts from "@/assets/svg/SwitchAccounts";
import useFetchWallets from "@/constants/useFetchWallets";

const Home = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === publicBalance.length - 1;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { user, token, expireAt, logout, userUuid, role } = useAuthStore();
  const { cooperatives } = useFetchCoop();
  console.log("user uuid:", userUuid, cooperatives);

  useEffect(() => {
    if (!user || !token) {
      logout();
      return;
    }
    const dateString = user.lastLoggedIn;
    const date = new Date(dateString);
    const now = new Date();
    const differenceInSeconds = Math.floor(now.getTime() - date.getTime());

    if (differenceInSeconds > expireAt) logout();
  }, [user, expireAt, token, logout]);

  const closeModal = () => {
    setIsModalVisible(false);
  };
  const { wallets } = useFetchWallets();
  return (
    <SafeAreaView className="flex-1 bg-[#1d2128]">
      <View className="p-4 pt-5 pb-12 flex-1">
        <View className="flex flex-row justify-between items-center">
          <View className="flex flex-row items-center gap-3">
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <Homeprofile />
            </TouchableOpacity>
            <View>
              <Text className="text-white/80 text-[18px]">Welcome,</Text>
              <Text className="text-white text-[18px] font-semibold">
                {user ? user.firstName : ""}
              </Text>
            </View>
          </View>
          <TouchableOpacity className="flex flex-row items-center gap-x-6">
            <Notification />
            <Settings />
          </TouchableOpacity>
        </View>

        <View className="flex-1 relative mt-6">
          {user.activeCooperative ? (
            <>
              {role !== "MANAGER" ? (
                ""
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    router.replace(
                      `/(root)/(manager-tabs)/${user.activeCooperative}`
                    )
                  }
                  className="flex flex-row justify-end items-center h-[40px] gap-x-3"
                >
                  <Text className="text-white mb-4">
                    Switch to manager's view
                  </Text>
                  <View className="mt-[-15px]">
                    <SwitchAccounts />
                  </View>
                </TouchableOpacity>
              )}
              <View>
                {wallets.map((item, index) => (
                  <LinearGradient
                    key={index}
                    colors={
                      isLastSlide
                        ? ["#3C2A07", "#92822E", "#4C4611"]
                        : ["#073C36", "#2E9278", "#114C46"]
                    }
                    start={{ x: 0, y: 1.5 }}
                    end={{ x: 1, y: 0 }}
                    className="flex relative z-10 justify-center h-[160px] w-full rounded-[16px] p-4"
                  >
                    <View className="absolute top-0 z-50 right-[-168px] w-full ">
                      <BgStyling />
                    </View>
                    <Text className="text-white text-[14px] font-[400]">
                      Your {item.title} balance
                    </Text>
                    <View className="py-4 flex flex-row w-[95%] items-center gap-3">
                      <Text className="text-white text-[20px] font-bold tracking-widest">
                        ₦{item.balance}
                      </Text>
                      <Unsee />
                    </View>
                    <View className="flex flex-row gap-x-2">
                      <TouchableOpacity
                        onPress={() =>
                          router.replace("/(root)/(others)/add-money")
                        }
                      >
                        <LinearGradient
                          colors={["#F4F4F433", "#FFFFFF0B"]}
                          className="flex items-center justify-center border-[#E8E7E780] border rounded-full w-[110px] h-[38px]"
                        >
                          <Text className="text-white text-[14px]">
                            + Add money
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                      <LinearGradient
                        colors={["#F4F4F433", "#FFFFFF0B"]}
                        className="flex items-center justify-center border-[#E8E7E780] border rounded-full w-[110px] h-[38px]"
                      >
                        <Text className="text-white text-[14px]">
                          Withdraw money
                        </Text>
                      </LinearGradient>
                    </View>
                  </LinearGradient>
                ))}
              </View>
            </>
          ) : (
            <Text></Text>
          )}
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
          <View
            className={`absolute  w-full pr-4 pl-10  ${
              user.activeCooperative ? "top-[470px]" : "top-[300px]"
            }`}
          >
            {cooperatives.length === 0 ? (
              <Text className={`text-white text-xl text-center`}>
                You are yet to join a cooperative society. Click the button
                below to get started
              </Text>
            ) : (
              <Text className="text-white text-xl text-center">
                {activeIndex === 0
                  ? "Recent transactions history will appear here"
                  : "Recent transactions on loan history will appear here"}
              </Text>
            )}
            {cooperatives.length === 0 ? (
              <CustomButton
                title={"Join a cooperative society"}
                onPress={() =>
                  router.replace("/(auth)/(member)/(join)/join-stages")
                }
                className="mt-6"
              />
            ) : (
              <CustomButton
                title={activeIndex === 0 ? "Add Money" : "Apply for a loan"}
                onPress={() =>
                  activeIndex === 0
                    ? router.replace("/(root)/(others)/add-money")
                    : ""
                }
                className="mt-6"
              />
            )}
            {!user.activeCooperative && (
              <TouchableOpacity
                onPress={() =>
                  router.replace("/(manager)/(registerstages)/registerstages")
                }
                className={`w-full p-3 mt-5 rounded-full flex flex-row justify-center items-center h-[44px] border border-white`}
              >
                <Text className="text-white">Register a cooperative</Text>
              </TouchableOpacity>
            )}
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
