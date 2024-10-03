import { LinearGradient } from "expo-linear-gradient";
import { SetStateAction } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  viewLoan: number | null;
  loan: any;
  setShowDetails: React.Dispatch<SetStateAction<boolean>>;
  formattedDate: (date: string) => string;
}

const MembersLoanDetails = ({
  viewLoan,
  loan,
  setShowDetails,
  formattedDate,
}: Props) => {
  return (
    <View className="h-[60vh] bg-[#1d2128] rounded-xl px-4">
      <TouchableOpacity
        onPress={() => setShowDetails(false)}
        className="mt-4 w-full flex flex-row gap-x-3"
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
    </View>
  );
};

export default MembersLoanDetails;
