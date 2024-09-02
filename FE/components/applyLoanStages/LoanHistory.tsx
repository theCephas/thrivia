import { memberLoanHistory } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

const LoanHistory = () => {
  return (
    <View className="flex h-full flex-col gap-y-6 p-4 pt-6">
      {memberLoanHistory.map((item, index) => (
        <LinearGradient
          key={index}
          colors={["#F4F4F433", "#FFFFFF0B"]}
          start={{ x: 0, y: 1.5 }}
          end={{ x: 1, y: 0 }}
          className="w-full p-[16px] border-[#E8E7E780] border rounded-[8px] flex flex-row justify-between items-center"
        >
          <View className="flex flex-row items-center gap-4">
            <View
              className={`p-1 scale-125 ${
                index % 2 === 1 ? "bg-green-500" : "bg-red-500"
              }  rounded-full`}
            >
              <item.icon />
            </View>

            <View>
              <Text className="text-white text-[16px] font-semibold ">
                {item.type}
              </Text>
              <Text className="text-white pt-2 text-[14px]">{item.time}</Text>
            </View>
          </View>
          <Text className="text-lg font-bold text-white">{item.amount}</Text>
        </LinearGradient>
      ))}
    </View>
  );
};

export default LoanHistory;
