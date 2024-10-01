/* eslint-disable @typescript-eslint/no-unused-vars */
import ArrowBack from "../../../../assets/svg/ArrowBack";
import { useAxiosInstance } from "../../../../constants/axiosInstance";
import useAuthStore from "../../../../store";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WithdrawDetails = () => {
  const { withdrawDetails } = useLocalSearchParams();
  const { cooperativeUUID, token } = useAuthStore();
  const axiosInstance = useAxiosInstance();
  const [details, setDetails] = useState<any>({});
  const getDetails = useCallback(async () => {
    try {
      const res = await axiosInstance.get(
        `/cooperatives/${cooperativeUUID}/withdrawal-request/${withdrawDetails}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.data;

      setDetails(data);
    } catch (error) {}
  }, [axiosInstance, cooperativeUUID, token, withdrawDetails]);

  useEffect(() => {
    getDetails();
  }, [getDetails]);
  return (
    <SafeAreaView className="h-full bg-[#1d2128]">
      <TouchableOpacity
        onPress={() => router.back()}
        className="mt-4 py-6 px-4 fixed w-full bg-[#0D1015]"
      >
        <ArrowBack />
        <Text className="text-white text-center mt-[-21px] text-2xl  ">
          Withdrawal request details
        </Text>
      </TouchableOpacity>
      <View className="mx-4 pt-4">
        <Text className="text-white text-[15px] font-Onest font-[500] mb-8">
          Personal details
        </Text>
        <LinearGradient
          colors={["#F4F4F433", "#FFFFFF0B"]}
          className="rounded-[8px] w-full p-4 border border-[#E8E7E780] flex flex-col gap-y-[18px] pt-0 "
        >
          {/* <View className="flex flex-row border border-[#E8E7E780] rounded-[2px]">
            <LinearGradient
              colors={["#F4F4F433", "#FFFFFF0B"]}
              className="w-[112px] "
            >
              <Text className="text-white  pl-1 py-2 font-Onest text-[12px]  ">Full name:</Text>
            </LinearGradient>
            <View className="border-l border-[#E8E7E780]">
              <Text className="w-[155px] text-white pl-1 py-2 font-Onest text-[12px] ">
                {details.createdBy.firstName} {details.createdBy.lastName}
              </Text>
            </View>
          </View> */}
          <View className="flex flex-row border border-[#E8E7E780] rounded-[2px]">
            <LinearGradient
              colors={["#F4F4F433", "#FFFFFF0B"]}
              className="w-[112px] "
            >
              <Text className="text-white  pl-1 py-2 font-Onest text-[12px]  ">
                Bank name:
              </Text>
            </LinearGradient>
            <View className="border-l border-[#E8E7E780]">
              <Text className="w-[155px] text-white pl-1 py-2 font-Onest text-[12px] ">
                {details.bankName}
              </Text>
            </View>
          </View>
          <View className="flex flex-row border border-[#E8E7E780] rounded-[2px]">
            <LinearGradient
              colors={["#F4F4F433", "#FFFFFF0B"]}
              className="w-[112px] "
            >
              <Text className="text-white  pl-1 py-2 font-Onest text-[12px]  ">
                Account number:
              </Text>
            </LinearGradient>
            <View className="border-l border-[#E8E7E780]">
              <Text className="w-[155px] text-white pl-1 py-2 font-Onest text-[12px] ">
                {details.accountNumber}
              </Text>
            </View>
          </View>
          <View className="flex flex-row border border-[#E8E7E780] rounded-[2px]">
            <LinearGradient
              colors={["#F4F4F433", "#FFFFFF0B"]}
              className="w-[112px] "
            >
              <Text className="text-white  pl-1 py-2 font-Onest text-[12px]  ">
                Account Name:
              </Text>
            </LinearGradient>
            <View className="border-l border-[#E8E7E780]">
              <Text className="w-[155px] text-white pl-1 py-2 font-Onest text-[12px] ">
                {details.accountName}
              </Text>
            </View>
          </View>
          <View className="flex flex-row border border-[#E8E7E780] rounded-[2px]">
            <LinearGradient
              colors={["#F4F4F433", "#FFFFFF0B"]}
              className="w-[112px] "
            >
              <Text className="text-white  pl-1 py-2 font-Onest text-[12px]  ">
                Amount:
              </Text>
            </LinearGradient>
            <View className="border-l border-[#E8E7E780]">
              <Text className="w-[155px] text-white pl-1 py-2 font-Onest text-[12px] ">
                ₦{details.amount}
              </Text>
            </View>
          </View>
          <View className="flex flex-row border border-[#E8E7E780] rounded-[2px]">
            <LinearGradient
              colors={["#F4F4F433", "#FFFFFF0B"]}
              className="w-[112px] "
            >
              <Text className="text-white  pl-1 py-2 font-Onest text-[12px]  ">
                Purpose:
              </Text>
            </LinearGradient>
            <View className="border-l border-[#E8E7E780]">
              <Text className="w-[155px] text-white pl-1 py-2 font-Onest text-[12px] ">
                {details.purpose === null ? "No purpose" : details.purpose}
              </Text>
            </View>
          </View>
          <View className="flex flex-row border border-[#E8E7E780] rounded-[2px]">
            <LinearGradient
              colors={["#F4F4F433", "#FFFFFF0B"]}
              className="w-[112px] "
            >
              <Text className="text-white  pl-1 py-2 font-Onest text-[12px]  ">
                Status:
              </Text>
            </LinearGradient>
            <View className="border-l border-[#E8E7E780]">
              <Text
                className={`
                  ${
                    details.status === "PENDING"
                      ? "text-amber-400"
                      : details.status === "APPROVED"
                      ? "text-green-400"
                      : "text-red-400"
                  } w-[155px] font-Onest pl-1 py-2
                `}
              >
                {details.status}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default WithdrawDetails;
