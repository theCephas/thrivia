import { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useAxiosInstance } from "../../../constants/axiosInstance";
import useAuthStore from "../../../store";
import useFetchWallets from "../../../constants/useFetchWallets";
import LoanMain from "../../../components/applyLoanStages/LoanMain";

const Finance = () => {
  const [withdrawalRequests, setWithdrawalRequests] = useState<any[]>([]);
  const [membersWithdrawalRequests, setMembersWithdrawalRequests] = useState<
    any[]
  >([]);
  const { token, cooperativeUUID, role } = useAuthStore();
  const axiosInstance = useAxiosInstance();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { wallets } = useFetchWallets("member");
  const [options, setOptions] = useState("Withdrawal Requests");

  // Fetch withdrawal requests
  const getWithdrawalRequests = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `/cooperatives/${cooperativeUUID}/withdrawal-requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setWithdrawalRequests(res.data);
    } catch (error) {
      console.error("Failed to fetch withdrawal requests:", error);
      Toast.show({
        type: "error",
        text1: `${error}`,
      });
    } finally {
      setLoading(false);
    }
  }, [axiosInstance, cooperativeUUID, token]);

  // Fetch user's withdrawal requests by wallet UUID
  const getUsersWithdrawalRequests = useCallback(
    async (walletUuid: string) => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          `/users/wallets/${walletUuid}/withdrawal-requests`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        setMembersWithdrawalRequests(res.data);
      } catch (error) {
        console.error("Failed to fetch user's withdrawal requests:", error);
      } finally {
        setLoading(false);
      }
    },
    [axiosInstance, token]
  );

  // Trigger initial data fetch
  useEffect(() => {
    getWithdrawalRequests();
    if (wallets.length > 0) {
      // Use the first wallet's UUID for fetching the withdrawal requests
      getUsersWithdrawalRequests(wallets[0].uuid);
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [getWithdrawalRequests, getUsersWithdrawalRequests, wallets]);

  // Refresh handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await getWithdrawalRequests();
      if (wallets.length > 0) {
        await getUsersWithdrawalRequests(wallets[0].uuid);
      }
    } finally {
      setRefreshing(false);
    }
  }, [getWithdrawalRequests, getUsersWithdrawalRequests, wallets]);

  return (
    <>
      {role === "MEMBER" ? (
        <SafeAreaView className="flex-1 flex items-center flex-col bg-[#1d2128]">
          <View className="flex-row flex items-center gap-6 p-4">
            {["Withdrawal Requests", "Loans"].map((text) => (
              <TouchableOpacity key={text} onPress={() => setOptions(text)}>
                <Text
                  className={`text-white font-OnestSemiBold mt-5 text-center text-[15px] pb-1 border-b-2 ease-linear duration-500 ${
                    options === text ? "border-primary" : "border-transparent"
                  }`}
                >
                  {text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {options === "Withdrawal Requests" && (
            <ScrollView
              contentContainerStyle={{ paddingBottom: 80 }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              className="w-full p-4"
            >
              {loading ? (
                <View className="w-full pl-4">
                  <ActivityIndicator size="large" color="#FFFFFF" />
                </View>
              ) : membersWithdrawalRequests.length === 0 ? (
                <View className="w-full flex items-center mt-10">
                  <Text className="text-white text-lg font-Onest">
                    No withdrawal requests yet
                  </Text>
                </View>
              ) : (
                <View className="">
                  {membersWithdrawalRequests.map((request, index) => (
                    <View
                      key={index}
                      className="bg-[#2d3038] p-4 mb-4 rounded-lg"
                    >
                      <Text className="text-white font-OnestSemiBold text-[16px]">
                        {request.accountName} | <Text>{request.bankName}</Text>
                      </Text>
                      <Text className="text-white/90 mt-2 font-Onest text-[14px]">
                        Member Name:{" "}
                        {request.wallet.cooperative.createdBy.firstName}{" "}
                        {request.wallet.cooperative.createdBy.lastName}
                      </Text>
                      <Text className="text-white/90 mt-2 font-Onest text-[14px]">
                        Amount: <Text className=" ">₦{request.amount}</Text>
                      </Text>
                      <Text
                        className={`text-white/90 mt-1 font-Onest text-[14px]`}
                      >
                        Status:{" "}
                        <Text
                          className={`${
                            request.status === "PENDING"
                              ? "text-amber-400"
                              : request.status === "APPROVED"
                              ? "text-green-400"
                              : "text-red-400"
                          } font-OnestSemiBold
                    `}
                        >
                          {request.status}
                        </Text>
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </ScrollView>
          )}
          {options === "Loans" && <LoanMain />}
        </SafeAreaView>
      ) : (
        <SafeAreaView className="flex-1 flex items-center flex-col bg-[#1d2128]">
          <View className="flex-row flex justify-between items-center p-4">
            <Text className="text-white font-OnestSemiBold mt-5 text-center text-[15px]">
              Withdrawal Requests
            </Text>
          </View>

          <ScrollView
            contentContainerStyle={{ paddingBottom: 80 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            className="w-full p-4"
          >
            {loading ? (
              <View className="w-full pl-4">
                <ActivityIndicator size="large" color="#FFFFFF" />
              </View>
            ) : withdrawalRequests.length === 0 ? (
              <View className="w-full flex items-center mt-10">
                <Text className="text-white text-lg font-Onest">
                  No withdrawal requests yet
                </Text>
              </View>
            ) : (
              <View className="">
                {withdrawalRequests.map((request, index) => (
                  <View
                    key={index}
                    className="bg-[#2d3038] p-4 mb-4 rounded-lg"
                  >
                    <Text className="text-white font-OnestSemiBold text-[16px]">
                      {request.accountName} | <Text>{request.bankName}</Text>
                    </Text>
                    <Text className="text-white/90 mt-2 font-Onest text-[14px]">
                      Member Name:{" "}
                      {request.wallet.cooperative.createdBy.firstName}{" "}
                      {request.wallet.cooperative.createdBy.lastName}
                    </Text>
                    <Text className="text-white/90 mt-2 font-Onest text-[14px]">
                      Amount: <Text className=" ">₦{request.amount}</Text>
                    </Text>
                    <Text
                      className={`text-white/90 mt-1 font-Onest text-[14px]`}
                    >
                      Status:{" "}
                      <Text
                        className={`${
                          request.status === "PENDING"
                            ? "text-amber-400"
                            : request.status === "APPROVED"
                            ? "text-green-400"
                            : "text-red-400"
                        } font-OnestSemiBold
                    `}
                      >
                        {request.status}
                      </Text>
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      )}
      <Toast />
    </>
  );
};

export default Finance;
