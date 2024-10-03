import { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import Modal from "react-native-modal";
import LoanDetails from "./LoanDetails";
import Toast from "react-native-toast-message";

interface Props {
  onRefreshLoans: () => void;
  formattedDate: (date: string) => string;
  loans: any[] | [];
  refreshing: boolean;
  getLoans: () => void;
}

const ManagerLoanMain = ({
  onRefreshLoans,
  formattedDate,
  loans,
  refreshing,
  getLoans,
}: Props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [viewLoan, setViewLoan] = useState<number | null>(null);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 80 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefreshLoans} />
      }
      className="w-full p-4"
    >
      <View className="px-4 flex flex-col gap-6 mt-1">
        <Text className="text-white text-[18px] font-OnestSemiBold border-b border-[#939090] pb-2">
          Loans
        </Text>
      </View>
      <ScrollView className="flex flex-col gap-y-4 w-full px-4 mt-1">
        {loans.map((loan, i) => (
          <TouchableOpacity
            key={i}
            className="w-full flex flex-row justify-between p-2 py-4 border border-[#939090]/75 rounded-lg"
            onPress={() => {
              setViewLoan(i);
              setShowDetails(true);
            }}
          >
            <View className="flex flex-col gap-y-1">
              <Text className="text-white text-base font-OnestSemiBold">
                ₦{loan.requestedAmount} -{" "}
                <Text className="text-sm text-white font-Onest">
                  {loan.user.firstName} {loan.user.lastName}
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
      <Modal
        isVisible={showDetails}
        onBackdropPress={() => setShowDetails(false)}
        onBackButtonPress={() => setShowDetails(false)}
        animationIn="pulse"
        className="relative"
      >
        <LoanDetails
          loan={viewLoan !== null ? loans[viewLoan] : {}}
          setShowDetails={setShowDetails}
          formattedDate={formattedDate}
          getLoans={getLoans}
          setViewLoan={setViewLoan}
        />
      </Modal>

      <Toast />
    </ScrollView>
  );
};

export default ManagerLoanMain;
