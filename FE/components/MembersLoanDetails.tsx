import { LinearGradient } from "expo-linear-gradient";
import { SetStateAction, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CustomButton from "./CustomButton";
import CustomModal from "./CustomModal";
import Toast from "react-native-toast-message";
import { useAxiosInstance } from "../constants/axiosInstance";
import InputField from "./InputField";

interface Props {
  loan: any;
  setShowDetails: React.Dispatch<SetStateAction<boolean>>;
  formattedDate: (date: string) => string;
  getLoans: () => void;
}

const MembersLoanDetails = ({
  loan,
  setShowDetails,
  formattedDate,
  getLoans,
}: Props) => {
  const [alertModal, setAlertModal] = useState<string | null>(null);
  const axiosInstance = useAxiosInstance();
  const [reason, setReason] = useState("");

  const handleReject = async () => {
    console.log("first");
    try {
      const res = await axiosInstance.put(`/loans/cancel/${loan.uuid}`, {
        reason: reason,
      });
      console.log(res);
      Toast.show({
        type: "success",
        text1: `Loan request Canceled`,
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
    <View className="bg-[#1d2128] rounded-xl px-4 py-6">
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
              Cooperative:
            </Text>
          </LinearGradient>
          <View className="border-l border-[#E8E7E780]">
            <Text className="w-[155px] pl-1 py-2 font-Onest text-[12px] text-white">
              {loan.cooperative.name}
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
      <CustomButton
        title="Cancel"
        onPress={() => setAlertModal("cancel")}
        className="mt-8 !bg-red-400"
      />
      <CustomModal
        isVisible={alertModal === "cancel"}
        OnNext={handleReject}
        title="Cancel Loan Request"
        message="Are you sure want to cancel this request? This action can't be reversed!"
        buttonText="Yes"
        buttonTextCancel="No"
        onButtonPress={() => setAlertModal(null)}
        UI={
          <View className="flex flex-col gap-y-2 mt-3">
            <Text className="text-xl">Reason</Text>
            <View className="border border-primary rounded-2xl h-14">
              <InputField
                value={reason}
                keyboardType="default"
                onChangeText={(val) => setReason(val)}
                className="text-primary"
              />
            </View>
          </View>
        }
      />
    </View>
  );
};

export default MembersLoanDetails;
