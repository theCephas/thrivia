import ArrowDown from "@/assets/svg/ArrowDown";
import BgStyling from "@/assets/svg/BgStyling";
import Unsee from "@/assets/svg/Unsee";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";
import CustomButton from "../CustomButton";
import { useRouter } from "expo-router";

interface Props {
  activeNav: number;
  setActiveNav: React.Dispatch<React.SetStateAction<number>>;
  setViewPage: React.Dispatch<React.SetStateAction<string>>;
}

const LoanMain = ({ activeNav, setActiveNav, setViewPage }: Props) => {
  const router = useRouter();
  const hasPendingLoan = true;
  return (
    <View>
      <View className="w-full flex flex-row justify-between px-28">
        {["Loans", "Savings"].map((text, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => setActiveNav(i)}
            className="pt-8 flex flex-col items-center"
          >
            <Text className={`text-white text-xl px-3`}>{text}</Text>

            <View
              className={`h-1 mt-1 w-full bg-primary rounded-t-[50px] transition-opacity duration-500 ${
                activeNav === i ? "opacity-100" : "opacity-0"
              }`}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View className="w-full px-4 mt-4 ">
        <LinearGradient
          colors={["#3C2A07", "#92822E", "#4C4611"]}
          start={{ x: 0, y: -0.5 }}
          end={{ x: 0.2, y: 2 }}
          className="flex relative justify-center w-full rounded-[16px] p-4 overflow-hidden"
        >
          <View className="absolute top-0 z-50 right-0">
            <BgStyling />
          </View>
          <Text className="text-white text-[20px] font-[400]">
            Loan balance
          </Text>
          <View className="py-4 flex flex-row items-center gap-3">
            <Text className="text-white text-4xl font-bold tracking-widest">
              ₦0.00
            </Text>
            <Unsee />
          </View>
          <TouchableOpacity
            onPress={() => {}}
            className="flex flex-row items-center"
          >
            <Text className="text-white text-lg font-bold pr-1">
              Transaction history
            </Text>
            <View className="-rotate-90 scale-90">
              <ArrowDown />
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <View className="px-4 flex flex-row justify-between mt-4">
        <CustomButton
          title="Repay loan"
          onPress={() => {}}
          className="w-[48%]"
        />
        <TouchableOpacity
          className={`w-[48%] mb-5 rounded-full  border border-white overflow-hidden`}
          onPress={() =>
            hasPendingLoan
              ? setViewPage("view-application")
              : router.replace("/(root)/(others)/(member-loan)/loan-stages")
          }
        >
          <LinearGradient
            colors={["rgba(244, 244, 244, 0.2)", "rgba(255, 255, 255, 0.044)"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            className="w-full flex flex-row justify-center items-center"
          >
            <Text className="text-white text-lg font-bold p-3">
              {hasPendingLoan ? "View application" : "Apply for loan"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoanMain;
