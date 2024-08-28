import CustomButton from "@/components/CustomButton";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const ViewApplication = () => {
  return (
    <View className="mt-8 mb-56 bg-[#1d2128]">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        className="h-full "
      >
        <View className="mx-4 pt-4">
          <Text className="text-white text-[18px] font-[500] mb-8">
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
                <Text className="text-white  pl-1 py-2  ">Full name:</Text>
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
                <Text className="text-white  pl-1 py-2  ">Date of birth:</Text>
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
                <Text className="text-white  pl-1 py-2  ">Phone number:</Text>
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
                <Text className="text-white  pl-1 py-2">Email address:</Text>
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
                <Text className="text-white  pl-1 py-2  ">
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
          <Text className="text-white text-[18px] font-[500] mb-8">
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
                <Text className="text-white  pl-1 py-2  ">Amount:</Text>
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
                <Text className="text-white  pl-1 py-2  ">Loan purpose:</Text>
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
                <Text className="text-white  pl-1 py-2  ">Loan term:</Text>
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
          <Text className="text-white text-[18px] font-[500] mb-8">
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
                <Text className="text-white  pl-1 py-2  ">Income source:</Text>
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
                <Text className="text-white  pl-1 py-2  ">
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
          <CustomButton title="Edit request" onPress={() => {}} />

          <TouchableOpacity
            onPress={() => {}}
            className={`w-full p-3 mb-5 rounded-full flex flex-row justify-center items-center h-[44px] border border-white`}
          >
            <Text className="text-white">Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default ViewApplication;
