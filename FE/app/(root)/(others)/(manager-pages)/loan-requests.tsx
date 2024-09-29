import ArrowBack from "../../../../assets/svg/ArrowBack";
import Filter from "../../../../assets/svg/Filter";
import Search from "../../../../assets/svg/Search";
import { loanHistory } from "../../../../constants";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const LoanRequests = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  return (
    // <SafeAreaView className="flex-1 h-full">
    <View className="h-full bg-[#1d2128]">
      <TouchableOpacity
        onPress={() => router.back()}
        className="mt-14 py-6 px-4 fixed w-full bg-[#0D1015]"
      >
        <ArrowBack />
        <Text className="text-white text-center mt-[-21px] text-2xl  ">
          Loan requests
        </Text>
      </TouchableOpacity>

      <View className="p-4 flex flex-row items-center gap-x-8 w-full">
        <View className="relative">
          <TextInput
            placeholder="Search"
            placeholderTextColor="#fff"
            className="w-[300px] border px-10 border-white rounded-full h-[40px] text-white text-[15px]"
          />
          <Search className="absolute top-3 left-3 " />
        </View>
        <View>
          <Filter />
        </View>
      </View>
      <ScrollView>
        <View className="p-4">
          {loanHistory.map((item, index) => (
            <View key={index}>
              <View className="h-[70px] w-full relative -z-30 px-4 py-2 border-[#E8E7E780] border-t flex flex-row items-center justify-between">
                <View className="flex flex-row items-center gap-x-4">
                  <View
                    className={`${
                      (index + 1) % 3 === 0
                        ? "bg-yellow-700 h-[5px] w-[5px]  rounded-full"
                        : (index + 1) % 2 === 0
                        ? "bg-green-600 h-[5px] w-[5px] rounded-full"
                        : "bg-red-600 h-[5px] w-[5px] rounded-full"
                    }`}
                  />
                  <View>
                    <Text className="text-white text-[14px] font-Onest font-semibold ">
                      {item.type}
                    </Text>
                    <Text className="text-white pt-2 text-[14px]">
                      {item.time}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                  className="w-[10px]"
                >
                  <item.icon />
                </TouchableOpacity>
              </View>
              {activeIndex === index && (
                <LinearGradient
                  colors={["#F4F4F433", "#FFFFFF0B"]}
                  className="absolute right-[21px] bg-gray-600 top-12 p-2 flex flex-col justify-center rounded-[2px] shadow-lg z-10 w-[200px] h-[110px] "
                >
                  <Text
                    onPress={() =>
                      router.navigate(
                        "/(others)/(manager-pages)/loan-request-details"
                      )
                    }
                    className="text-white text-[14px] font-Onest z-50   w-full "
                  >
                    View Details
                  </Text>
                  <Text className="text-white text-[14px] font-Onest z-50 py-4   w-full ">
                    View member profile
                  </Text>
                  <Text className="text-white text-[14px] font-Onest z-50   w-full ">
                    Delete
                  </Text>
                </LinearGradient>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
    // </SafeAreaView>
  );
};

export default LoanRequests;
