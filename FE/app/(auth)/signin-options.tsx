import { icons } from "@/constants";
import { Link } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const SignInOptions = () => {
  return (
    <ScrollView className="flex-1  bg-[#1d2128]">
      <View className="flex-1 items-center justify-center flex-col gap-8 mt-[60px]">
        <View>
          <Image source={require("@/assets/images/thrivia.png")} className="" />
        </View>
        <View>
          <Text className="text-xl pt-2 font-OnestMedium text-center text-white ">
            Which of the following applies to you?
          </Text>
        </View>
      </View>

      <View className="flex flex-col justify-center items-center gap-16 p-6 mt-6">
        <TouchableOpacity>
          <Link href={"/(auth)/(member)/sign-up"}>
            <View className="h-[86px] flex flex-row items-center p-2 bg-[#f4f4f4]/[15%] bg-opacity-25 rounded-md border-[0.5px] border-[#e8e7e7] gap-2 w-[320px] text-white ">
              <View className="w-[250px]">
                <Text className="text-white px-2 font-bold text-[18px]">
                  Cooperative member
                </Text>
                <Text className="text-white pt-2 px-2">
                  I am an existing member of a cooperative or I am interested in
                  becoming a member of an existing cooperative
                </Text>
              </View>
              <View>
                <Image source={icons.arrowRight} />
              </View>
            </View>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity>
          <Link href={"/(auth)/(manager)/sign-up"}>
            <View className="h-[86px] flex flex-row items-center p-2 bg-[#f4f4f4]/[15%] bg-opacity-25 rounded-md border-[0.5px] border-[#e8e7e7] gap-2 w-[320px] text-white ">
              <View className="w-[250px]">
                <Text className="text-white px-2 font-bold text-[18px]">
                  Cooperative manager
                </Text>
                <Text className="text-white pt-2 px-2">
                  I own an existing cooperative society or I am interested in
                  owning a cooperative society
                </Text>
              </View>
              <View>
                <Image source={icons.arrowRight} />
              </View>
            </View>
          </Link>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignInOptions;
