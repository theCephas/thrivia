import { TouchableOpacity } from "react-native";
import CustomButton from "../../../../components/CustomButton";
import InputField from "../../../../components/InputField";

import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import CoopIcon from "../../../../assets/svg/CoopIcon";
import UserTag from "../../../../assets/svg/UserTag";

const BecomeMemeber = () => {
  const [form, setForm] = useState({ uniqueID: "", memberNum: "" });
  const router = useRouter();
  return (
    <ScrollView className="relative h-full flex-1 bg-[#1d2128]">
      <View className="flex-1 items-center justify-center flex-col gap-8 bg-[#1d2128] mt-[60px]">
        <View>
          <Image
            source={require("../../../../assets/images/thrivia.png")}
            className=""
          />
        </View>
        <View>
          <Text className="text-3xl   text-center text-white mt-3 px-10">
            Start your thriving journey with us
          </Text>
        </View>
      </View>
      <View className="p-5 mt-8">
        <InputField
          placeholder={`Cooperative Unique ID`}
          icon={CoopIcon}
          value={form.uniqueID}
          onChangeText={(value: any) => setForm({ ...form, uniqueID: value })}
        />
        <InputField
          placeholder={`Membership number`}
          value={form.memberNum}
          icon={UserTag}
          onChangeText={(value: any) => setForm({ ...form, memberNum: value })}
        />

        <View className="mt-[270px]">
          <CustomButton
            title="Proceed"
            onPress={() =>
              router.replace("/(auth)/(member)/(join)/join-stages")
            }
            className="mt-6"
          />
          <TouchableOpacity
            className={`w-full p-3 mb-5 rounded-full flex flex-row justify-center items-center h-[44px] border border-white`}
            onPress={() => router.replace("/(root)/(tabs)/home")}
          >
            <Text className="text-white">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default BecomeMemeber;
