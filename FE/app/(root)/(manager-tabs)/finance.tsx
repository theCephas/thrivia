import LoanBg from "@/assets/svg/LoanBg";
import Unsee from "@/assets/svg/Unsee";
import CustomButton from "@/components/CustomButton";
import { financeLoanHistory } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const Finance = () => {
  const [activeTab, setActiveTab] = useState("Loans");

  return <View className="flex-1 bg-[#1d2128]"></View>;
};

export default Finance;
