import ArrowBack from "@/assets/svg/ArrowBack";
import Send from "@/assets/svg/Send";
import CustomButton from "@/components/CustomButton";
import CustomModal from "@/components/CustomModal";
import { useAxiosInstance } from "@/constants/axiosInstance";
import useAuthStore from "@/store";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { TextInput } from "react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

const MembershipRequestDetails = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [isLoanApprovedModalVisible, setIsLoanApprovedModalVisible] = useState(
    false
  );
  const [reason, setReason] = useState("");
  const { token, cooperativeUUID } = useAuthStore();
  const { membershipRequestDetails } = useLocalSearchParams();
  const [details, setDetails] = useState<any>({});
  const axiosInstance = useAxiosInstance();

  const getDetails = useCallback(async () => {
    try {
      const res = await axiosInstance.get(
        `/cooperatives/${cooperativeUUID}/application/${membershipRequestDetails}`,

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
  }, []);

  useEffect(() => {
    getDetails();
  }, []);

  const approveRequest = async () => {
    try {
      const res = await axiosInstance.post(
        `/cooperatives/${cooperativeUUID}/application/${membershipRequestDetails}/approve`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.data;
      await getDetails();
      setIsLoanApprovedModalVisible(true);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: `${error}`,
      });
    } finally {
      closeApproveModal();
    }
  };

  const rejectRequest = async () => {
    try {
      const res = await axiosInstance.post(
        `/cooperatives/${cooperativeUUID}/application/${membershipRequestDetails}/reject`,
        { reason: reason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.data;
      await getDetails();
      closeModal();
    } catch (error) {}
  };

  const onSubmit = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  const onApprovalClick = () => {
    setIsApproveModalVisible(true);
  };

  const closeApproveModal = () => {
    setIsApproveModalVisible(false);
  };

  const closeLoanApprovedModal = () => {
    setIsLoanApprovedModalVisible(false);
  };

  return (
    <View className="h-full bg-[#1d2128]">
      <TouchableOpacity
        onPress={() => router.back()}
        className="mt-14 py-6 px-4 fixed w-full bg-[#0D1015]"
      >
        <ArrowBack />
        <Text className="text-white text-center mt-[-21px] text-2xl  ">
          Membership requests
        </Text>
      </TouchableOpacity>

      <View className="flex-row items-center justify-between border-b border-[#939090] pt-6 pb-1 mx-4 ">
        <Text className="text-white text-[15px] font-Onest font-[500] ">
          {details.fullName} application request
        </Text>
        <LinearGradient
          colors={["#F4F4F433", "#FFFFFF0B"]}
          className="w-[67px] h-[20px] rounded-[4px] border border-[#E8E7E780] flex items-center justify-center"
        >
          <Text
            className={`text-center font-[500] ${
              details.status === "PENDING"
                ? "text-[#D19806]"
                : details.status === "REJECTED"
                ? "text-[#C40202]"
                : "text-primary"
            }`}
          >
            {details.status}
          </Text>
        </LinearGradient>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        className="h-full "
      >
        <View className="mx-4 pt-4">
          <Text className="text-white text-[15px] font-Onest font-[500] mb-8">
            Personal details
          </Text>
          <LinearGradient
            colors={["#F4F4F433", "#FFFFFF0B"]}
            className="rounded-[8px] w-full p-4 border border-[#E8E7E780] flex flex-col gap-y-[18px] pt-0 "
          >
            <View className="flex flex-row border border-[#E8E7E780] rounded-[2px]">
              <LinearGradient
                colors={["#F4F4F433", "#FFFFFF0B"]}
                className="w-[112px] "
              >
                <Text className="text-white  pl-1 py-2  ">Full name:</Text>
              </LinearGradient>
              <View className="border-l border-[#E8E7E780]">
                <Text className="w-[155px] text-white pl-1 py-2 ">
                  {details.fullName}
                </Text>
              </View>
            </View>
            <View className="flex flex-row border border-[#E8E7E780] rounded-[2px]">
              <LinearGradient
                colors={["#F4F4F433", "#FFFFFF0B"]}
                className="w-[112px] "
              >
                <Text className="text-white  pl-1 py-2  ">Date of birth:</Text>
              </LinearGradient>
              <View className="border-l border-[#E8E7E780]">
                <Text className="w-[155px] text-white pl-1 py-2 ">
                  {details.dateOfBirth}
                </Text>
              </View>
            </View>
            <View className="flex flex-row border border-[#E8E7E780] rounded-[2px]">
              <LinearGradient
                colors={["#F4F4F433", "#FFFFFF0B"]}
                className="w-[112px] "
              >
                <Text className="text-white  pl-1 py-2  ">Phone number:</Text>
              </LinearGradient>
              <View className="border-l border-[#E8E7E780]">
                <Text className="w-[155px] text-white pl-1 py-2 ">
                  {details?.phoneNumber?.replace("234", "0")}
                </Text>
              </View>
            </View>
            <View className="flex flex-row border border-[#E8E7E780] rounded-[2px]">
              <LinearGradient
                colors={["#F4F4F433", "#FFFFFF0B"]}
                className="w-[112px] "
              >
                <Text className="text-white  pl-1 py-2  ">Email address:</Text>
              </LinearGradient>
              <View className="border-l border-[#E8E7E780]">
                <Text className="w-[155px] text-white pl-1 py-2 ">
                  {details.email}
                </Text>
              </View>
            </View>
            <View className="flex flex-row border border-[#E8E7E780] rounded-[2px]">
              <LinearGradient
                colors={["#F4F4F433", "#FFFFFF0B"]}
                className="w-[112px] "
              >
                <Text className="text-white  pl-1 py-2  ">
                  Residential add:
                </Text>
              </LinearGradient>
              <View className="border-l border-[#E8E7E780]">
                <Text className="w-[155px] text-white pl-1 py-2 ">
                  {details.address}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {details.status === "APPROVED" ? (
          ""
        ) : (
          <View className="mt-6 p-4">
            <CustomButton
              title="Approve membership request"
              onPress={onApprovalClick}
            />

            <TouchableOpacity
              onPress={onSubmit}
              className={`w-full p-3 mb-5 rounded-full flex flex-row justify-center items-center h-[44px] border border-white`}
            >
              <Text className="text-white">Reject</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <Toast position="top" topOffset={100} />
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
              className={`rounded-full text-[15px] font-Onest text-black flex-1 focus:outline-none border border-gray-600 pl-4 h-11`}
              placeholder="Reason for rejection"
              value={reason}
              onChangeText={(val) => setReason(val)}
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
      <CustomModal
        isVisible={isApproveModalVisible}
        onClose={closeApproveModal}
        title="Approve membership request?"
        message="Kindly ensure that all information was checked correctly before approving this request"
        buttonText="Confirm approval"
        buttonTextCancel="Cancel"
        onButtonPress={closeApproveModal}
        OnNext={approveRequest}
      />
      <CustomModal
        isVisible={isLoanApprovedModalVisible}
        title="Membership request approved!"
        message="You have successfully approved this membership request"
        buttonText="Ok"
        onButtonPress={closeLoanApprovedModal}
        onClose={closeLoanApprovedModal}
        OnNext={closeLoanApprovedModal}
      />
    </View>
  );
};
export default MembershipRequestDetails;
