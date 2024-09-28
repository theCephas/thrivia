import Homeprofile from "@/assets/svg/Homeprofile";
import Notification from "@/assets/svg/Notification";
import Settings from "@/assets/svg/Settings";
import Unsee from "@/assets/svg/Unsee";
import Swiper from "react-native-swiper";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import BgStyling from "@/assets/svg/BgStyling";
import CustomButton from "@/components/CustomButton";
import InviteModal from "@/components/InviteModal";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import useAuthStore from "@/store";
import CustomSideModal from "@/components/CustomSideModal";
import SwitchAccounts from "@/assets/svg/SwitchAccounts";
import useFetchWallets from "@/constants/useFetchWallets";
import useFetchCoop from "@/constants/useFetchCoop";
import { ActivityIndicator } from "react-native";
import { useAxiosInstance } from "@/constants/axiosInstance";
import ArrowLeftBottom from "@/assets/svg/ArrowLeftBottom";
import ArrowRightTop from "@/assets/svg/ArrowRightTop";
import See from "@/assets/svg/See";

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSliderVisible, setIsSliderVisible] = useState(false);
  const { wallets } = useFetchWallets("manager");
  const router = useRouter();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const axiosInstance = useAxiosInstance();
  const { cooperatives, loadingCoop } = useFetchCoop();

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
    token,
    cooperativeUUID,
    role,
  } = useAuthStore();

  const fetchTransactions = useCallback(
    async (walletUuid: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(
          `/cooperatives/${cooperativeUUID}/wallets/${walletUuid}/transactions`
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

  // Trigger the transaction fetch whenever the component mounts and wallets are available
  useEffect(() => {
    if (wallets.length > 0) {
      // Automatically fetch transactions for the first wallet
      fetchTransactions(wallets[0].uuid);
    }
  }, [wallets, fetchTransactions]);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    fetchTransactions(wallets[0].uuid).finally(() => setRefreshing(false));
  }, [wallets]);

  const [see, setSee] = useState(true);

  const handleSee = () => {
    setSee(!see);
  };

  return (
    <SafeAreaView className="flex-1 h-full bg-[#1d2128]">
      <View className="h-full px-1">
        <View className="p-4 pt-5 pb-12 flex-1">
          <View className="flex flex-row justify-between items-center">
            <View className="flex flex-row items-center gap-3">
              <TouchableOpacity onPress={() => setIsSliderVisible(true)}>
                <Homeprofile width={30} height={30} />
              </TouchableOpacity>
              <View>
                <Text className="hidden">Cooperative UUID: {uuid}</Text>
                <Text className="text-white text-[25px] font-OnestSemiBold  pt-1">
                  {cooperativeName}
                </Text>
              </View>
            </View>
            <View className="flex flex-row items-center gap-x-6">
              <TouchableOpacity>
                <Notification />
              </TouchableOpacity>
              <TouchableOpacity>
                <Settings />
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-1 relative mt-6">
            <TouchableOpacity
              onPress={() => router.replace("/(root)/(tabs)/home")}
              className="flex flex-row justify-end items-center h-[40px] gap-x-3"
            >
              <Text className="text-white mb-4 font-Onest">
                Switch to member's view
              </Text>
              <View className="mt-[-15px]">
                <SwitchAccounts />
              </View>
            </TouchableOpacity>
            <ScrollView
              contentContainerStyle={{ paddingBottom: 80 }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <LinearGradient
                colors={["#073C36", "#2E9278", "#114C46"]}
                start={{ x: 0, y: 1.5 }}
                end={{ x: 1, y: 0 }}
                className="rounded-[9px]"
              >
                {wallets.map((item, index) => (
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
                            <View className="text-white text-[20px] gap-x-1   flex tracking-widest flex-row items-center">
                              <Text className="text-white text-[14px] font-OnestBold">
                                ₦
                              </Text>
                              <Text className="text-[25px] font-OnestBold mt-2 text-white">
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
                          router.replace({
                            pathname: "/(root)/(others)/add-money",
                            params: { role: "MANAGER", walletUuid: item.uuid },
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
                          router.replace({
                            pathname:
                              "/(root)/(others)/(manager-withdraw)/withdraw",
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
                ))}
              </LinearGradient>
            </ScrollView>
          </View>

          {loadingCoop ? (
            <View className="absolute top-[320px] w-full pl-4">
              <ActivityIndicator size="large" color="#FFFFFF" />
            </View>
          ) : (
            <>
              {cooperatives.length < 1 ? (
                <View className="absolute top-[350px] flex items-center w-full pl-4">
                  <Text className="text-white text-[16px] font-Onest  w-[200px] leading-[21px] text-center">
                    You don&apos;t have any member in your cooperative society
                    yet.{" "}
                  </Text>
                  <Text className="text-white text-[16px] font-Onest  w-[200px] leading-[21px] text-center pt-4 pb-6">
                    Click the button below to get started
                  </Text>
                  <CustomButton title="Add members" onPress={onSubmit} />
                </View>
              ) : (
                <View className="absolute top-[320px] w-full pl-4">
                  {loading ? (
                    <View className="absolute top-[100px] w-full pl-4">
                      <ActivityIndicator size="large" color="#FFFFFF" />
                    </View>
                  ) : (
                    <>
                      <View className="flex flex-col mt-1">
                        {transactions.length < 1 ? (
                          <View>
                            <Text className="text-white text-[16px] font-Onest text-center">
                              Recent transactions history will appear here
                            </Text>
                            <CustomButton
                              title={"Add Money"}
                              onPress={() =>
                                router.replace("/(root)/(others)/add-money")
                              }
                              className="mt-6"
                            />
                          </View>
                        ) : (
                          <>
                            <View className="flex-1 flex-row items-center justify-between border-b border-[#939090] pb-1 ">
                              <Text className="text-white text-[18px] font-OnestSemiBold ">
                                Transaction history
                              </Text>
                              <Text className="text-primary text-[16px] font-OnestSemiBold  pl-12"></Text>
                            </View>
                            <ScrollView
                              contentContainerStyle={{ paddingBottom: 80 }}
                            >
                              {transactions.map((item, index) => {
                                const formattedDate = format(
                                  new Date(item.createdAt),
                                  "d, EEEE yyyy - p"
                                );

                                return (
                                  <View key={index}>
                                    <LinearGradient
                                      key={index}
                                      colors={["#F4F4F433", "#FFFFFF0B"]}
                                      start={{ x: 0, y: 1.5 }}
                                      end={{ x: 1, y: 0 }}
                                      className="h-[70px] w-full p-[16px] mt-4 border-[#E8E7E780] border rounded-[8px] flex justify-between"
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
                                        <Text className="text-white pt-2 text-[12px] font-Onest">
                                          {formattedDate}
                                        </Text>
                                      </View>
                                      <View className="">
                                        <Text className="text-white text-right font-OnestBold mt-[-30px] text-[16px]">
                                          {see ? "****" : `₦${item.amount}`}
                                        </Text>
                                        {/* <Text className="text-white text-right   mt-[-30px] text-[15px]">
{user.firstName}
</Text> */}
                                      </View>
                                    </LinearGradient>
                                  </View>
                                );
                              })}
                            </ScrollView>
                          </>
                        )}
                      </View>
                    </>
                  )}
                </View>
              )}
            </>
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
      </View>
    </SafeAreaView>
  );
};

export default Home;
