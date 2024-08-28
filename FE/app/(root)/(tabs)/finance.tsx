import ArrowBack from "@/assets/svg/ArrowBack";
import LoanHistory from "@/components/applyLoanStages/LoanHistory";
import LoanMain from "@/components/applyLoanStages/LoanMain";
import ViewApplication from "@/components/applyLoanStages/ViewApplication";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Finance = () => {
  const [activeNav, setActiveNav] = useState(0);
  const [viewPage, setViewPage] = useState("main");

  return (
    <SafeAreaView className="h-full bg-[#1d2128] w-full flex flex-col ">
      <View className={`w-full bg-[#0D1015] mt-6 py-6`}>
        {viewPage === "main" ? (
          <Text className="text-white text-2xl font-bold w-full items-center  text-center">
            Finances
          </Text>
        ) : (
          <TouchableOpacity
            onPress={() => setViewPage("main")}
            className="w-full flex flex-row items-center gap-6 pl-4"
          >
            <ArrowBack />
            <Text className="text-white text-2xl font-bold">
              {viewPage === "history"
                ? "Transaction history"
                : "Loan application"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {viewPage === "main" && (
        <LoanMain
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          setViewPage={setViewPage}
        />
      )}

      <View className="px-4 w-full mt-8">
        <View className="border-b border-gray-50 pb-2 flex flex-row justify-between">
          <Text className="text-white text-xl font-bold">
            {viewPage === "main"
              ? "Loan history"
              : viewPage === "history"
              ? "Loan transactions"
              : "Loan application details"}
          </Text>
          {viewPage === "main" && (
            <TouchableOpacity onPress={() => setViewPage("history")}>
              <Text className="text-primary font-bold text-lg">View all</Text>
            </TouchableOpacity>
          )}
          {viewPage === "view-application" && (
            <LinearGradient
              colors={[
                "rgba(244, 244, 244, 0.2)",
                "rgba(255, 255, 255, 0.044)",
              ]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              className="rounded-lg overflow-hidden border border-white"
            >
              <Text className="text-warning-500 font-bold px-3 py-1">
                Pending
              </Text>
            </LinearGradient>
          )}
        </View>
      </View>
      {viewPage === "history" && <LoanHistory />}
      {viewPage === "view-application" && <ViewApplication />}
    </SafeAreaView>
  );
};

export default Finance;
