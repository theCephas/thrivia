import ArrowDown from "../../assets/svg/ArrowDown";
import BgStyling from "../../assets/svg/BgStyling";
import Unsee from "../../assets/svg/Unsee";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";
import CustomButton from "../CustomButton";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import See from "../../assets/svg/See";

interface Props {
  // activeNav: number;
  // setActiveNav: React.Dispatch<React.SetStateAction<number>>;
  // setViewPage: React.Dispatch<React.SetStateAction<string>>;
}

const LoanMain = () => {
  const router = useRouter();
  const [see, setSee] = useState(false);

  useEffect(() => {}, []);

  return (
    <View className="w-full">
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
          <Text className="text-white text-xl font-OnestSemiBold">
            Loan balance
          </Text>
          <View className="py-4 flex flex-row items-center gap-3">
            <Text className="text-white text-4xl   tracking-widest">
              ₦{see ? "0.00" : "***"}
            </Text>
            <TouchableOpacity
              onPress={() => setSee((prev) => !prev)}
              className="ml-3 mt-1"
            >
              {see ? <See /> : <Unsee />}
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      <View className="px-4 flex flex-row justify-between mt-4">
        <CustomButton
          title="Apply for loan"
          onPress={() =>
            router.replace("/(root)/(others)/(member-loan)/loan-stages")
          }
          className="w-[48%]"
        />
        {/* <TouchableOpacity
          className={`w-[48%] mb-5 rounded-full  border border-white overflow-hidden`}
          onPress={() => {}}
        >
          <LinearGradient
            colors={["rgba(244, 244, 244, 0.2)", "rgba(255, 255, 255, 0.044)"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            className="w-full flex flex-row justify-center items-center"
          >
            <Text className="text-white text-lg font-Onest   p-3">
              View application
            </Text>
          </LinearGradient>
        </TouchableOpacity> */}
      </View>

      <View className="px-4 flex flex-col gap-6 mt-1">
        <Text className="text-white text-[18px] font-OnestSemiBold border-b border-[#939090] pb-2">
          Loan history
        </Text>
      </View>
    </View>
  );
};

export default LoanMain;
