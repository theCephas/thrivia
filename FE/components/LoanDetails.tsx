import { LinearGradient } from "expo-linear-gradient";
import { SetStateAction, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CustomButton from "./CustomButton";
import { useAxiosInstance } from "../constants/axiosInstance";
import useAuthStore from "../store";
import Toast from "react-native-toast-message";
import CustomModal from "./CustomModal";

interface Props {
  loan: any;
  setShowDetails: React.Dispatch<SetStateAction<boolean>>;
  formattedDate: (date: string) => string;
  getLoans: () => void;
  setViewLoan: React.Dispatch<SetStateAction<number | null>>;
}

const LoanDetails = ({
  loan,
  setShowDetails,
  formattedDate,
  getLoans,
  setViewLoan,
}: Props) => {
  const [alertModal, setAlertModal] = useState<string | null>(null);
  const axiosInstance = useAxiosInstance();
  const { cooperativeUUID } = useAuthStore();

  const handleApprove = async () => {
    try {
      const res = await axiosInstance.post(
        `/cooperatives/${cooperativeUUID}/loans/${loan.uuid}/approve`
      );
      console.log(res);
      Toast.show({
        type: "success",
        text1: `Loan request approved successfully`,
      });
      setShowDetails(false);
      getLoans();
    } catch (err) {
      console.log(err);
      Toast.show({
        type: "error",
        text1: `${err}`,
      });
    } finally {
      setAlertModal(null);
    }
  };
  const handleReject = async () => {
    try {
      const res = await axiosInstance.post(
        `/cooperatives/${cooperativeUUID}/loans/${loan.uuid}/reject`
      );
      console.log(res);
      Toast.show({
        type: "success",
        text1: `Loan request approved successfully`,
      });
      getLoans();
      setShowDetails(false);
    } catch (err) {
      console.log(err);
      Toast.show({
        type: "error",
        text1: `${err}`,
      });
    } finally {
      setAlertModal(null);
    }
  };

  return (
    <View className="bg-[#1d2128] rounded-xl px-4 py-4">
      <TouchableOpacity
        onPress={() => setShowDetails(false)}
        className="my-4 w-full flex flex-row gap-x-3"
      >
        {/* < /> */}
        <Text className="text-lg text-white font-OnestSemiBold h-6 w-6 flex flex-row items-center text-center border border-white rounded-full">
          X
        </Text>
        <Text className="text-2xl text-white font-OnestSemiBold">
          Loan details
        </Text>
      </TouchableOpacity>
      <View className="flex flex-col gap-y-1 w-full mt-3">
        <View className="flex flex-row border border-[#E8E7E780] rounded-[2px]">
          <LinearGradient
            colors={["#F4F4F433", "#FFFFFF0B"]}
            className="w-[112px] "
          >
            <Text className=" pl-1 py-2 font-Onest text-[12px] text-white">
              Amount:
            </Text>
          </LinearGradient>
          {/*  */}
          <View className="border-l border-[#E8E7E780]">
            <Text className="w-[155px] pl-1 py-2 font-Onest text-[12px] text-white">
              ₦ {loan.requestedAmount}
            </Text>
          </View>
        </View>
        <View className="flex flex-row border border-[#E8E7E780] rounded-[2px]">
          <LinearGradient
            colors={["#F4F4F433", "#FFFFFF0B"]}
            className="w-[112px] "
          >
            <Text className=" pl-1 py-2 font-Onest text-[12px] text-white">
              Purpose:
            </Text>
          </LinearGradient>
          {/*  */}
          <View className="border-l border-[#E8E7E780]">
            <Text className="w-[155px] pl-1 py-2 font-Onest text-[12px] text-white">
              {loan.purpose}
            </Text>
          </View>
        </View>
        <View className="flex flex-row border border-[#E8E7E780] rounded-[2px]">
          <LinearGradient
            colors={["#F4F4F433", "#FFFFFF0B"]}
            className="w-[112px] "
          >
            <Text className=" pl-1 py-2 font-Onest text-[12px] text-white">
              User:
            </Text>
          </LinearGradient>
          <View className="border-l border-[#E8E7E780]">
            <Text className="w-[155px] pl-1 py-2 font-Onest text-[12px] text-white">
              {loan.user.firstName} {loan.user.lastName}
            </Text>
          </View>
        </View>
        <View className="flex flex-row border border-[#E8E7E780] rounded-[2px]">
          <LinearGradient
            colors={["#F4F4F433", "#FFFFFF0B"]}
            className="w-[112px] "
          >
            <Text className=" pl-1 py-2 font-Onest text-[12px] text-white">
              Status:
            </Text>
          </LinearGradient>
          <View className="border-l border-[#E8E7E780]">
            <Text
              className={`w-[155px] pl-1 py-2 font-Onest text-[12px] text-white
                  ${
                    loan.status === "PENDING"
                      ? "text-amber-400"
                      : loan.status === "APPROVED"
                      ? "text-green-400"
                      : "text-red-400"
                  }
                `}
            >
              {loan.status}
            </Text>
          </View>
        </View>

        <View className="flex flex-row border border-[#E8E7E780] rounded-[2px]">
          <LinearGradient
            colors={["#F4F4F433", "#FFFFFF0B"]}
            className="w-[112px] h-[50px] "
          >
            <Text className="text-white  pl-1 py-4  ">Bank account:</Text>
          </LinearGradient>
          <View className="border-l border-[#E8E7E780] w-[155px] pl-1 flex flex-col h-[50px] py-1">
            <Text className=" text-white ">{loan.bankName}</Text>
            <Text className=" text-white ">{loan.accountName}</Text>
            <Text className=" text-white ">{loan.accountNumber}</Text>
          </View>
        </View>

        <View className="flex flex-row border border-[#E8E7E780] rounded-[2px]">
          <LinearGradient
            colors={["#F4F4F433", "#FFFFFF0B"]}
            className="w-[112px] "
          >
            <Text className=" pl-1 py-2 font-Onest text-[12px] text-white">
              Time:
            </Text>
          </LinearGradient>
          <View className="border-l border-[#E8E7E780]">
            <Text className="w-[155px] pl-1 py-2 font-Onest text-[12px] text-white">
              {formattedDate(loan.updatedAt)}
            </Text>
          </View>
        </View>
      </View>
      <View className="w-full flex flex-row gap-x-4 mt-8">
        <CustomButton
          title="Reject"
          onPress={() => setAlertModal("reject")}
          className="w-[48%] !bg-red-400"
        />
        <CustomButton
          title="Approve"
          onPress={() => setAlertModal("approve")}
          className="w-[48%]"
        />
      </View>
      <Toast />
      <CustomModal
        isVisible={alertModal === "approve"}
        OnNext={handleApprove}
        title="Approve Loan Request"
        message="Are you sure want approve this request? This action can't be reversed!"
        buttonText="Approve"
        buttonTextCancel="Cancel"
        onButtonPress={() => setAlertModal(null)}
      />
      <CustomModal
        isVisible={alertModal === "reject"}
        OnNext={handleReject}
        title="Reject Loan Request"
        message="Are you sure want reject this request? This action can't be reversed!"
        buttonText="Reject"
        buttonTextCancel="Cancel"
        onButtonPress={() => setAlertModal(null)}
      />
    </View>
  );
};

export default LoanDetails;
