import ArrowBack from "../../../../assets/svg/ArrowBack";
import CustomButton from "../../../../components/CustomButton";
import CustomModal from "../../../../components/CustomModal";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const LoanRequestDetails = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [isLoanApprovedModalVisible, setIsLoanApprovedModalVisible] = useState(
    false
  );

  const onSubmit = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  const onApprovalClick = () => {
    setIsApproveModalVisible(true);
  };

  const closeApproveModal = () => {
    setIsApproveModalVisible(false);
  };

  const openLoanApprovedModal = () => {
    setIsLoanApprovedModalVisible(true);
    closeApproveModal();
  };

  const closeLoanApprovedModal = () => {
    setIsLoanApprovedModalVisible(false);
  };

  return (
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

      <View className="flex-row items-center justify-between border-b border-[#939090] pt-6 pb-1 mx-4 ">
        <Text className="text-white text-[15px] font-Onest font-[500] ">
          Cephas Iseoluwa loan request
        </Text>
        <LinearGradient
          colors={["#F4F4F433", "#FFFFFF0B"]}
          className="w-[67px] h-[20px] rounded-[4px] border border-[#E8E7E780] flex items-center justify-center"
        >
          <Text className="text-[#D19806] text-center font-[500] ">
            Pending
          </Text>
        </LinearGradient>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        className="h-full "
      >
        <View className="mx-4 pt-4">
          <Text className="text-white text-[15px] font-Onest font-[500] mb-8">
            Personal details
          </Text>
          <LinearGradient
            colors={["#F4F4F433", "#FFFFFF0B"]}
            className="rounded-[8px] w-full h-[264px] p-4 border border-[#E8E7E780] flex flex-col gap-y-[18px] pt-0 "
          >
            <View className="flex flex-row border border-[#E8E7E780] rounded-[2px]">
              <LinearGradient
                colors={["#F4F4F433", "#FFFFFF0B"]}
                className="w-[112px] h-[28px] "
              >
                <Text className="text-white  pl-1 py-2 font-Onest text-[12px]  ">
                  Full name:
                </Text>
              </LinearGradient>
              <View className="border-l border-[#E8E7E780]">
                <Text className="w-[155px] h-[28px] text-white pl-1 py-2 ">
                  Cephas Iseoluwa
                </Text>
              </View>
            </View>
            <View className="flex flex-row border border-[#E8E7E780] rounded-[2px]">
              <LinearGradient
                colors={["#F4F4F433", "#FFFFFF0B"]}
                className="w-[112px] h-[28px] "
              >
                <Text className="text-white  pl-1 py-2 font-Onest text-[12px]  ">
                  Date of birth:
                </Text>
              </LinearGradient>
              <View className="border-l border-[#E8E7E780]">
                <Text className="w-[155px] h-[28px] text-white pl-1 py-2 ">
                  12 - 08 - 2000
                </Text>
              </View>
            </View>
            <View className="flex flex-row border border-[#E8E7E780] rounded-[2px]">
              <LinearGradient
                colors={["#F4F4F433", "#FFFFFF0B"]}
                className="w-[112px] h-[28px] "
              >
                <Text className="text-white  pl-1 py-2 font-Onest text-[12px]  ">
                  Phone number:
                </Text>
              </LinearGradient>
              <View className="border-l border-[#E8E7E780]">
                <Text className="w-[155px] h-[28px] text-white pl-1 py-2 ">
                  090 888 923 1654
                </Text>
              </View>
            </View>
            <View className="flex flex-row border border-[#E8E7E780] rounded-[2px]">
              <LinearGradient
                colors={["#F4F4F433", "#FFFFFF0B"]}
                className="w-[112px] h-[28px] "
              >
                <Text className="text-white  pl-1 py-2 font-Onest text-[12px]  ">
                  Email address:
                </Text>
              </LinearGradient>
              <View className="border-l border-[#E8E7E780]">
                <Text className="w-[155px] h-[28px] text-white pl-1 py-2 ">
                  cephas@gmail.com
                </Text>
              </View>
            </View>
            <View className="flex flex-row border border-[#E8E7E780] rounded-[2px]">
              <LinearGradient
                colors={["#F4F4F433", "#FFFFFF0B"]}
                className="w-[112px] h-[28px] "
              >
                <Text className="text-white  pl-1 py-2 font-Onest text-[12px]  ">
                  Residential add:
                </Text>
              </LinearGradient>
              <View className="border-l border-[#E8E7E780]">
                <Text className="w-[155px] h-[28px] text-white pl-1 py-2 ">
                  Ikorodu, Lagos
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View className="mx-4 pt-4">
          <Text className="text-white text-[15px] font-Onest font-[500] mb-8">
            Loan details
          </Text>
          <LinearGradient
            colors={["#F4F4F433", "#FFFFFF0B"]}
            className="rounded-[8px] w-full h-[168px] p-4 border border-[#E8E7E780] flex flex-col gap-y-[18px] pt-0 "
          >
            <View className="flex flex-row border border-[#E8E7E780] rounded-[2px]">
              <LinearGradient
                colors={["#F4F4F433", "#FFFFFF0B"]}
                className="w-[112px] h-[28px] "
              >
                <Text className="text-white  pl-1 py-2 font-Onest text-[12px]  ">
                  Amount:
                </Text>
              </LinearGradient>
              <View className="border-l border-[#E8E7E780]">
                <Text className="w-[155px] h-[28px] text-white pl-1 py-2 ">
                  N500,000.00
                </Text>
              </View>
            </View>
            <View className="flex flex-row border border-[#E8E7E780] rounded-[2px]">
              <LinearGradient
                colors={["#F4F4F433", "#FFFFFF0B"]}
                className="w-[112px] h-[28px] "
              >
                <Text className="text-white  pl-1 py-2 font-Onest text-[12px]  ">
                  Loan purpose:
                </Text>
              </LinearGradient>
              <View className="border-l border-[#E8E7E780]">
                <Text className="w-[155px] h-[28px] text-white pl-1 py-2 ">
                  Education
                </Text>
              </View>
            </View>
            <View className="flex flex-row border border-[#E8E7E780] rounded-[2px]">
              <LinearGradient
                colors={["#F4F4F433", "#FFFFFF0B"]}
                className="w-[112px] h-[28px] "
              >
                <Text className="text-white  pl-1 py-2 font-Onest text-[12px]  ">
                  Loan term:
                </Text>
              </LinearGradient>
              <View className="border-l border-[#E8E7E780]">
                <Text className="w-[155px] h-[28px] text-white pl-1 py-2 ">
                  2 months
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View className="mx-4 pt-4">
          <Text className="text-white text-[15px] font-Onest font-[500] mb-8">
            Financial information
          </Text>
          <LinearGradient
            colors={["#F4F4F433", "#FFFFFF0B"]}
            className="rounded-[8px] w-full h-[206px] p-4 border border-[#E8E7E780] flex flex-col gap-y-[20px] pt-0 "
          >
            <View className="flex flex-row border border-[#E8E7E780] rounded-[2px]">
              <LinearGradient
                colors={["#F4F4F433", "#FFFFFF0B"]}
                className="w-[112px] h-[28px] "
              >
                <Text className="text-white  pl-1 py-2 font-Onest text-[12px]  ">
                  Income source:
                </Text>
              </LinearGradient>
              <View className="border-l border-[#E8E7E780]">
                <Text className="w-[155px] h-[28px] text-white pl-1 py-2 ">
                  Personal business
                </Text>
              </View>
            </View>
            <View className="flex flex-row border border-[#E8E7E780] rounded-[2px]">
              <LinearGradient
                colors={["#F4F4F433", "#FFFFFF0B"]}
                className="w-[112px] h-[28px] "
              >
                <Text className="text-white  pl-1 py-2 font-Onest text-[12px]  ">
                  Employment type:
                </Text>
              </LinearGradient>
              <View className="border-l border-[#E8E7E780]">
                <Text className="w-[155px] h-[28px] text-white pl-1 py-2 ">
                  Self-employed
                </Text>
              </View>
            </View>
            <View className="flex flex-row border border-[#E8E7E780] rounded-[2px]">
              <LinearGradient
                colors={["#F4F4F433", "#FFFFFF0B"]}
                className="w-[112px] h-[50px] "
              >
                <Text className="text-white  pl-1 py-4  ">Bank account:</Text>
              </LinearGradient>
              <View className="border-l border-[#E8E7E780] w-[155px] pl-1 flex flex-col h-[50px] py-1">
                <Text className=" text-white ">United Bank of Africa</Text>
                <Text className=" text-white ">Cephas Iseoluwa</Text>
                <Text className=" text-white ">23098765</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View className="mt-6 p-4">
          <CustomButton
            title="Approve loan request"
            onPress={onApprovalClick}
          />

          <TouchableOpacity
            onPress={onSubmit}
            className={`w-full p-3 mb-5 rounded-full flex flex-row justify-center items-center h-[44px] border border-white`}
          >
            <Text className="text-white">Reject</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <CustomModal
        isVisible={isModalVisible}
        onClose={closeModal}
        title="Reject Application?"
        message="Are you sure you want to reject this application?"
        buttonText="Yes"
        buttonTextCancel="Cancel"
        onButtonPress={closeModal}
      />
      <CustomModal
        isVisible={isApproveModalVisible}
        onClose={closeApproveModal}
        title="Approve Application?"
        message="Are you sure you want to approve this application?"
        buttonText="Yes"
        buttonTextCancel="Cancel"
        onButtonPress={closeApproveModal}
        OnNext={openLoanApprovedModal}
      />
      <CustomModal
        isVisible={isLoanApprovedModalVisible}
        title="Loan Approved"
        message="The loan has been successfully approved."
        buttonText="Ok"
        onButtonPress={closeLoanApprovedModal}
        onClose={closeLoanApprovedModal}
        OnNext={closeLoanApprovedModal}
      />
    </View>
  );
};
export default LoanRequestDetails;
