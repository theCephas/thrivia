import Filter from "@/assets/svg/Filter";
import Search from "@/assets/svg/Search";
import { members } from "@/constants";
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
import { Checkbox } from "react-native-paper";

const Community = () => {
  const [checkedState, setCheckedState] = useState<boolean[]>(
    new Array(members.length).fill(false)
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleCheckboxChange = (index: number) => {
    const updatedCheckedState = checkedState.map((item, idx) =>
      idx === index ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  return (
    <View className="h-full bg-[#1d2128]">
      <View className="mt-12 py-6 px-4 fixed w-full bg-[#0D1015]">
        <Text className="text-white text-center text-2xl font-OnestBold ">
          Members
        </Text>
      </View>

      <View className="p-4 flex flex-row items-center gap-x-8 w-full">
        <View className="relative">
          <TextInput
            placeholder="Search"
            placeholderTextColor="#fff"
            className="w-[300px] border px-10 border-white rounded-full h-[40px] text-white text-[14px]"
          />
          <Search className="absolute top-3 left-3 " />
        </View>
        <View>
          <Filter />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 75 }}>
        <View className="p-4">
          <Text className="text-white text-center font-Onest text-[30px]  ">
            Coming soon
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Community;
