import Homeprofile from "@/assets/svg/Homeprofile";
import Notification from "@/assets/svg/Notification";
import Settings from "@/assets/svg/Settings";
import Unsee from "@/assets/svg/Unsee";
import Swiper from "react-native-swiper";
import {
  ActivityIndicator,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useRef, useState } from "react";
import { publicBalance, publicBlDeets } from "@/constants";
import BgStyling from "@/assets/svg/BgStyling";
import CustomSideModal from "@/components/CustomSideModal";
import CustomButton from "@/components/CustomButton";
import { Link, router, useRouter } from "expo-router";
import useAuthStore from "@/store";
import useFetchCoop from "@/constants/useFetchCoop";
import SwitchAccounts from "@/assets/svg/SwitchAccounts";
import useFetchWallets from "@/constants/useFetchWallets";
import { useAxiosInstance } from "@/constants/axiosInstance";
import { format } from "date-fns";
import ArrowRightTop from "@/assets/svg/ArrowRightTop";
import ArrowLeftBottom from "@/assets/svg/ArrowLeftBottom";
import { ScrollView } from "react-native";
import See from "@/assets/svg/See";

const Home = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const axiosInstance = useAxiosInstance();
  const [refreshing, setRefreshing] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();
  const {
    user,
    token,
    expireAt,
    logout,
    role,
    cooperativeName,
    setWalletUuid,
  } = useAuthStore();
  const { cooperatives, loadingCoop } = useFetchCoop();

  const { wallets } = useFetchWallets("member");

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

  const fetchTransactions = useCallback(
    async (walletUuid: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(
          `/users/wallets/${walletUuid}/transactions`
        );

        setTransactions(response.data);
      } catch (err) {
        setError("Failed to load transactions");
      } finally {
        setLoading(false);
      }
    },
    [axiosInstance]
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (wallets.length > 0) {
      fetchTransactions(wallets[0].uuid);
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [fetchTransactions, wallets]);
  useEffect(() => {
    if (wallets.length > 0) {
      fetchTransactions(wallets[0].uuid);
    }
  }, [wallets, fetchTransactions]);

  const [see, setSee] = useState(true);

  const handleSee = () => {
    setSee(!see);
  };
  return (
    <SafeAreaView className="flex-1 bg-[#1d2128]">
      <View className="p-4 pt-5 pb-12 flex-1">
        <View className="flex flex-row justify-between items-center">
          <View className="flex flex-row items-center gap-3">
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <Homeprofile width={30} height={30} />
            </TouchableOpacity>
            <View>
              <Text className="text-white text-[25px] font-OnestSemiBold">
                {user?.activeCooperative ? cooperativeName : user?.firstName}
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
              {/* {role !== "MANAGER" ? (
                ""
              ) : ( */}
              <TouchableOpacity
                onPress={() =>
                  router.replace(
                    `/(root)/(manager-tabs)/${user.activeCooperative}`
                  )
                }
                className="flex flex-row justify-end items-center h-[40px] gap-x-3"
              >
                <Text className="text-white mb-4 font-Onest">
                  Switch to manager's view
                </Text>
                <View className="mt-[-15px]">
                  <SwitchAccounts />
                </View>
              </TouchableOpacity>
              {/* )} */}
              <ScrollView
                contentContainerStyle={{ paddingBottom: 80 }}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              >
                <LinearGradient
                  colors={["#073C36", "#2E9278", "#114C46"]}
                  start={{ x: 0, y: 1.5 }}
                  end={{ x: 1, y: 0 }}
                  className="rounded-[9px]"
                >
                  {wallets.map((item, index) => {
                    return (
                      <View
                        key={index}
                        className="flex relative z-10 justify-center h-[168px] w-full rounded-[16px] p-4"
                      >
                        <View className="absolute top-0 z-50 right-[-168px] w-full ">
                          <BgStyling />
                        </View>
                        <View className="flex flex-row gap-2 items-center">
                          <Text className="text-white text-[17px] font-Onest font-[600]">
                            Your {item.title} balance
                          </Text>
                          <TouchableOpacity
                            onPress={handleSee}
                            className="ml-3 mt-1"
                          >
                            {see ? (
                              <See height={15} width={15} />
                            ) : (
                              <Unsee height={15} width={15} />
                            )}
                          </TouchableOpacity>
                        </View>
                        <View className="flex flex-col py-3 ">
                          <View>
                            <View className="py- flex flex-row w-[95%] items-center gap-3">
                              <View className="py- flex flex-row w-[95%] items-center ">
                                <View className="text-white text-[14px] font-Onest gap-x-1   flex tracking-widest flex-row items-center">
                                  <Text className="text-white text-[14px] font-OnestBold">
                                    ₦
                                  </Text>
                                  <Text className="text-[25px] mt-2 text-white font-OnestBold">
                                    {see ? "*****" : item.availableBalance}{" "}
                                  </Text>
                                </View>
                              </View>
                            </View>
                            <View className="flex flex-row items-center gap-2">
                              <Text className="text-[14px] font-Onest text-white/80">
                                Total balance:
                              </Text>
                              <Text className="text-[14px] font-Onest text-white/80">
                                ₦ {see ? "*****" : item.totalBalance}{" "}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View className="flex flex-row gap-x-2">
                          <TouchableOpacity
                            onPress={() => {
                              fetchTransactions(item.uuid);
                              router.replace({
                                pathname: "/(root)/(others)/add-money",
                                params: {
                                  role: "MEMBER",
                                  walletUuid: item.uuid,
                                },
                              });
                            }}
                          >
                            <LinearGradient
                              colors={["#F4F4F433", "#FFFFFF0B"]}
                              className="flex items-center justify-center border-[#E8E7E780] border rounded-full w-[110px] h-[38px]"
                            >
                              <Text className="text-white text-[12px] font-Onest">
                                + Add money
                              </Text>
                            </LinearGradient>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              setWalletUuid(item.uuid);
                              router.replace({
                                pathname:
                                  "/(root)/(others)/(member-withdraw)/withdraw",
                                params: { uuid: item.uuid },
                              });
                            }}
                          >
                            <LinearGradient
                              colors={["#F4F4F433", "#FFFFFF0B"]}
                              className="flex items-center justify-center border-[#E8E7E780] border rounded-full w-[110px] h-[38px]"
                            >
                              <Text className="text-white text-[12px] font-Onest">
                                Withdraw money
                              </Text>
                            </LinearGradient>
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  })}
                </LinearGradient>
              </ScrollView>
            </>
          ) : (
            <Text></Text>
          )}
        </View>

        {loading ? (
          <View className="absolute top-[320px] w-full pl-4">
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        ) : (
          <>
            {transactions.length > 0 ? (
              <View className="absolute top-[320px] w-full pl-4">
                <View className="flex-1 flex-row items-center justify-between border-b border-[#939090] pb-1 ">
                  <Text className="text-white text-[18px] font-OnestSemiBold ">
                    Transaction history
                  </Text>
                  <Text className="text-primary text-[16px] font-OnestSemiBold  pl-12"></Text>
                </View>

                <View className="flex flex-col gap-y-3 mt-[1px]">
                  {transactions.map((item, index) => {
                    const formattedDate = format(
                      new Date(item.createdAt),
                      "d, EEEE yyyy - p"
                    );

                    return (
                      <LinearGradient
                        key={index}
                        colors={["#F4F4F433", "#FFFFFF0B"]}
                        start={{ x: 0, y: 1.5 }}
                        end={{ x: 1, y: 0 }}
                        className="h-[70px] w-full p-[16px] border-[#E8E7E780] border rounded-[8px] flex justify-between"
                      >
                        <View
                          className={`absolute top-[20px] left-3 ${
                            item.type !== "credit"
                              ? "bg-red-500"
                              : "bg-green-500"
                          }  rounded-full`}
                        >
                          {item.type === "credit" ? (
                            <ArrowLeftBottom />
                          ) : (
                            <ArrowRightTop />
                          )}
                        </View>
                        <View className="ml-7">
                          <Text className="text-white text-[14px] font-Onest font-semibold">
                            {item.type === "credit"
                              ? "You were credited"
                              : "You were debited"}
                          </Text>
                          <Text className="text-white pt-2 font-Onest text-[12px]">
                            {formattedDate}
                          </Text>
                        </View>
                        <View className="">
                          <Text className="text-white text-right font-OnestBold mt-[-30px] text-[15px]">
                            ₦{item.amount}
                          </Text>
                          {/* <Text className="text-white text-right   mt-[-30px] text-[15px]">
                        {user.firstName}
                      </Text> */}
                        </View>
                      </LinearGradient>
                    );
                  })}
                </View>
              </View>
            ) : (
              <View
                className={`absolute  w-full pr-4 pl-10  ${
                  user.activeCooperative ? "top-[370px]" : "top-[300px]"
                }`}
              >
                {loadingCoop ? (
                  <View className=" w-full pl-4">
                    <ActivityIndicator size="large" color="#FFFFFF" />
                  </View>
                ) : (
                  <>
                    {cooperatives.length === 0 ? (
                      <Text
                        className={`text-white text-[16px] font-Onest text-center`}
                      >
                        You are yet to join a cooperative society. Click the
                        button below to get started
                      </Text>
                    ) : (
                      <Text className="text-white text-[16px] font-Onest text-center">
                        Recent transactions history will appear here
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
                        title={"Add Money"}
                        onPress={() =>
                          router.replace("/(root)/(others)/add-money")
                        }
                        className="mt-6"
                      />
                    )}
                  </>
                )}
                {!user.activeCooperative && (
                  <TouchableOpacity
                    onPress={() =>
                      router.replace(
                        "/(manager)/(registerstages)/registerstages"
                      )
                    }
                    className={`w-full p-3 mt-5 rounded-full flex flex-row justify-center items-center h-[44px] border border-white`}
                  >
                    <Text className="text-white">Register a cooperative</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </>
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
