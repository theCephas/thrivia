import BgStyling from "../../assets/svg/BgStyling";
import Unsee from "../../assets/svg/Unsee";
import { LinearGradient } from "expo-linear-gradient";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomButton from "../CustomButton";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import See from "../../assets/svg/See";
import { useAxiosInstance } from "../../constants/axiosInstance";
import Toast from "react-native-toast-message";
import Modal from "react-native-modal";
import { format } from "date-fns";
import MembersLoanDetails from "../MembersLoanDetails";

const LoanMain = () => {
  const router = useRouter();
  const axiosInstance = useAxiosInstance();
  const [see, setSee] = useState(false);
  const [loans, setLoans] = useState<any[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [viewLoan, setViewLoan] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const getLoans = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/loans");
      const data = await res.data;
      console.log(data);
      setLoans(data);
    } catch (err) {
      console.log(err);
      Toast.show({
        type: "error",
        text1: `${err}`,
      });
    }
  }, [axiosInstance]);

  useEffect(() => {
    getLoans();
  }, [getLoans]);

  const formattedDate = (date: any) => {
    return format(new Date(date), "d, MMMM yyyy - p");
  };

  const onRefreshLoans = useCallback(async () => {
    setRefreshing(true);
    try {
      await getLoans();
    } finally {
      setRefreshing(false);
    }
  }, [getLoans]);

  return (
    <ScrollView
      className="w-full"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefreshLoans} />
      }
    >
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
      <ScrollView className="flex flex-col gap-y-4 w-full px-4 mt-1">
        {loans.map((loan, i) => (
          <TouchableOpacity
            key={i}
            className="w-full flex flex-row justify-between p-2 py-4 border border-[#939090]/75 rounded-lg"
            onPress={() => {
              // console.log(loans[i]);
              setViewLoan(i);
              setShowDetails(true);
            }}
          >
            <View className="flex flex-col gap-y-1">
              <Text className="text-white text-base font-OnestSemiBold">
                ₦{loan.requestedAmount} -{" "}
                <Text className="text-sm text-white font-Onest">
                  {loan.cooperative.name}
                </Text>
              </Text>
              <Text className="text-xs text-[#939090] font-Onest">
                {formattedDate(loan.updatedAt)}
              </Text>
            </View>
            <View className="flex flex-col gap-y-1 pr-2">
              <Text className="text-white font-Onest">{loan.purpose}</Text>
              <Text
                className={`
                  ${
                    loan.status === "PENDING"
                      ? "text-amber-400"
                      : loan.status === "APPROVED"
                      ? "text-green-400"
                      : "text-red-400"
                  } font-Onest
                `}
              >
                {loan.status}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Toast position="top" topOffset={100} />
      <Modal
        isVisible={showDetails}
        onBackdropPress={() => setShowDetails(false)}
        onBackButtonPress={() => setShowDetails(false)}
        animationIn="pulse"
        className="relative"
      >
        <MembersLoanDetails
          loan={viewLoan !== null ? loans[viewLoan] : {}}
          setShowDetails={setShowDetails}
          formattedDate={formattedDate}
          getLoans={getLoans}
        />
      </Modal>
    </ScrollView>
  );
};

export default LoanMain;
