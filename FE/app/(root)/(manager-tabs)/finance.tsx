import { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useAxiosInstance } from "../../../constants/axiosInstance";
import useAuthStore from "../../../store";
import CustomModal from "../../../components/CustomModal";
import Send from "../../../assets/svg/Send";
import { router } from "expo-router";
import { ActivityIndicator } from "react-native";

const Finance = () => {
  const [withdrawalRequests, setWithdrawalRequests] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [currentRequestUuid, setCurrentRequestUuid] = useState<string | null>(
    null
  );
  const { token, cooperativeUUID } = useAuthStore();
  const axiosInstance = useAxiosInstance();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

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
    } finally {
      setLoading(false);
    }
  }, [axiosInstance, cooperativeUUID, token]);

  // Approve a withdrawal request
  const approveRequest = async (uuid: string) => {
    try {
      await axiosInstance.post(
        `/cooperatives/${cooperativeUUID}/withdrawal-request/${uuid}/approve`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      Toast.show({
        type: "success",
        text1: "Request approved successfully",
      });
      getWithdrawalRequests(); // Refresh the requests after approval
    } catch (error) {
      console.error("Failed to approve request:", error);
      Toast.show({
        type: "error",
        text1: `${error}`,
      });
    }
  };

  // Reject a withdrawal request
  const rejectRequest = async () => {
    if (!currentRequestUuid) return;

    try {
      await axiosInstance.post(
        `/cooperatives/${cooperativeUUID}/withdrawal-request/${currentRequestUuid}/reject`,
        {
          reason: rejectionReason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      Toast.show({
        type: "success",
        text1: "Request rejected successfully",
      });
      getWithdrawalRequests(); // Refresh the requests after rejection
      closeModal();
    } catch (error) {
      console.error("Failed to reject request:", error);
      Toast.show({
        type: "error",
        text1: "Failed to reject request",
      });
    }
  };

  // Open modal and store the current request uuid
  const openRejectionModal = (uuid: string) => {
    setCurrentRequestUuid(uuid);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setRejectionReason("");
  };

  useEffect(() => {
    getWithdrawalRequests();
  }, [getWithdrawalRequests]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await getWithdrawalRequests();
    } finally {
      setRefreshing(false);
    }
  }, [getWithdrawalRequests]);

  return (
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
          <View className=" w-full pl-4">
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
              <View key={index} className="bg-[#2d3038] p-4 mb-4 rounded-lg">
                <Text className="text-white font-OnestSemiBold text-[16px]">
                  {request.accountName} | <Text>{request.bankName}</Text>
                </Text>
                <Text className="text-white/90 mt-2 font-Onest text-[14px]">
                  Member Name: {request.wallet.cooperative.createdBy.firstName}{" "}
                  {request.wallet.cooperative.createdBy.lastName}
                </Text>
                <Text className="text-white/90 mt-2 font-Onest text-[14px]">
                  Amount:{" "}
                  <Text className="font-OnestSemiBold">₦{request.amount}</Text>
                </Text>
                <Text className={`text-white/90 mt-1 font-Onest text-[14px]`}>
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
                <View className="mt-4 flex-row justify-between">
                  {request.status === "PENDING" && (
                    <>
                      <TouchableOpacity
                        className="bg-green-600 w-[80px] h-[30px] flex items-center justify-center rounded-[6px]"
                        onPress={() => approveRequest(request.uuid)}
                      >
                        <Text className="text-white font-OnestSemiBold text-[12px]">
                          Approve
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        className="bg-red-600 w-[80px] h-[30px] flex items-center justify-center rounded-[6px]"
                        onPress={() => openRejectionModal(request.uuid)}
                      >
                        <Text className="text-white font-OnestSemiBold text-[12px]">
                          Reject
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}

                  <TouchableOpacity
                    className="bg-blue-600 w-[80px] h-[30px] flex items-center justify-center rounded-[6px]"
                    onPress={() =>
                      router.navigate(
                        `/(others)/(member-withdraw)/${request.uuid}`
                      )
                    }
                  >
                    <Text className="text-white font-OnestSemiBold text-[12px]">
                      View Details
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Modal for rejection */}
      <CustomModal
        isVisible={isModalVisible}
        OnNext={closeModal}
        title="Reject Application?"
        message="Are you sure you want to reject this application?"
        buttonText="Cancel"
        onButtonPress={closeModal}
        UI={
          <View className="mt-6 flex flex-row ">
            <TextInput
              className="rounded-full text-[15px] font-Onest text-black flex-1 focus:outline-none border border-gray-600 pl-4 h-11"
              placeholder="Reason for rejection"
              value={rejectionReason}
              onChangeText={(val) => setRejectionReason(val)}
            />
            <TouchableOpacity
              onPress={rejectRequest}
              className="h-11 w-11 flex items-center justify-center ml-3 rounded-full bg-primary"
            >
              <Send />
            </TouchableOpacity>
          </View>
        }
      />
      <Toast />
    </SafeAreaView>
  );
};

export default Finance;
