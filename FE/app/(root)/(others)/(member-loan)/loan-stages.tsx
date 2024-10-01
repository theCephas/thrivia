import Thrivia from "../../../../assets/svg/Thrivia";
import ApplyStageOne from "../../../../components/applyLoanStages/ApplyStageOne";
import ApplyStageTwo from "../../../../components/applyLoanStages/ApplyStageTwo";
import CircleProgress from "../../../../components/CircleProgress";

import CustomButton from "../../../../components/CustomButton";
import CustomModal from "../../../../components/CustomModal";

import { router } from "expo-router";

import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAxiosInstance } from "../../../../constants/axiosInstance";
import useAuthStore from "../../../../store";
import Toast from "react-native-toast-message";

const JoinStages = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [banks, setBanks] = useState<any[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  const axiosInstance = useAxiosInstance();
  const [form, setForm] = useState({
    accName: "",
    accNumber: "",
    amount: "",
    purpose: "",
    bankName: "",
    bankCode: "",
  });
  const { cooperativeName, coopUuid } = useAuthStore();

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axiosInstance.get("/wallets/banks");
        const bankList = response.data.map((bank: any) => ({
          name: bank.name,
          code: bank.code,
        }));

        setBanks(bankList);
      } catch (error) {
        // setError("Failed to load banks");
      }
    };

    fetchBanks();
  }, [axiosInstance]);

  useEffect(() => {
    if (form.accNumber.length === 10) {
      verifyAccountNumber();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.accNumber, form.bankCode]);

  const verifyAccountNumber = async () => {
    if (form.accNumber.length === 10 && form.bankCode) {
      setIsVerifying(true);
      setIsVerified(false);
      try {
        const response = await axiosInstance.post(
          "/wallets/verify-bank-details",
          {
            bankCode: form.bankCode,
            accountNumber: form.accNumber,
          }
        );

        if (response.data?.account_name) {
          setForm({
            ...form,
            accName: response.data.account_name, // Use correct field name
          });
          setIsVerified(true);
        } else {
          // setError("Account name not found");
          setIsVerified(false);
        }
      } catch (error) {
        // setError("Invalid account number or bank.");
        setForm((prevForm) => ({
          ...prevForm,
          accountName: "",
        }));
        setIsVerified(false);
      } finally {
        setIsVerifying(false);
      }
    } else {
      // setError("Account number must be exactly 10 digits");
    }
  };

  const nextStage = () => {
    if (currentStage < 3) {
      setCurrentStage(currentStage + 1);
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(0);

  const onSubmit = async (num: number) => {
    const amount = parseInt(form.amount);

    try {
      const res = await axiosInstance.post("/loans", {
        amount: amount,
        cooperativeUuid: coopUuid,
        bankCode: form.bankCode,
        bankName: form.bankName,
        accountNumber: form.accNumber,
        accountName: form.accName,
        purpose: form.purpose,
      });
      const data = await res.data;
      console.log(data);
      Toast.show({
        type: "success",
        text1: `Loan request sent successfully`,
      });
      setIsModalVisible(num);
    } catch (err) {
      console.log(err);
      Toast.show({
        type: "error",
        text1: `${err}`,
      });
    } finally {
      setIsModalVisible(0);
    }
  };

  const closeModal = () => {
    setIsModalVisible(0);
  };
  return (
    <ScrollView className="flex-1 h-full relative bg-[#1d2128]">
      <View className="flex items-centejustify-center flex-col gap-4 bg-[#1d2128] mt-[8px]">
        <View className="flex flex-row justify-between px-5">
          <Thrivia width={130} height={130} />
          <CircleProgress stage={currentStage} totalStages={2} />
        </View>
        <View>
          <Text className="text-2xl   m-auto text-center text-white ">
            Need funds on the go?
          </Text>
          <Text className="text-center text-lg font-Onest text-white px-14">
            Apply for a loan with {cooperativeName} to get started
          </Text>
        </View>
      </View>
      <View className="p-5">
        <Text className="text-white text-lg font-Onest">Loan details</Text>
        {currentStage === 1 && <ApplyStageOne form={form} setForm={setForm} />}

        {currentStage === 2 && (
          <ApplyStageTwo
            form={form}
            setForm={setForm}
            banks={banks}
            isVerifying={isVerifying}
            isVerified={isVerified}
          />
        )}

        <View className={` ${currentStage === 1 ? "mt-20" : "mt-[150px]"}`}>
          <CustomButton
            title="Proceed"
            onPress={() => {
              // eslint-disable-next-line no-unused-expressions
              currentStage === 2 ? setIsModalVisible(1) : nextStage();
            }}
          />

          <TouchableOpacity
            onPress={() => router.replace("/(root)/(tabs)/finance")}
            className={`w-full p-3 mb-5 rounded-full flex flex-row justify-center items-center h-[44px] border border-white`}
          >
            <Text className="text-white">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>

      <CustomModal
        isVisible={isModalVisible === 1}
        onClose={closeModal}
        OnNext={() => onSubmit(2)}
        title="Submit application?"
        message="Kindly ensure that all data was provided correctly before submitting your application.
 You can't edit an application once it's submitted"
        buttonText="Submit application"
        buttonTextCancel="Cancel"
        onButtonPress={closeModal}
      />
      <CustomModal
        isVisible={isModalVisible === 2}
        onClose={closeModal}
        OnNext={() => setIsModalVisible(0)}
        title="Application completed!"
        message="Your application has his forwarded to the directors of Freedom Cooperative for further review."
        buttonText="Cancel"
        buttonTextCancel=""
        onButtonPress={closeModal}
      />
      <Toast position="top" topOffset={100} />
    </ScrollView>
  );
};

export default JoinStages;
