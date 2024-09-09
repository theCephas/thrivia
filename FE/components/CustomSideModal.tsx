import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import Homeprofile from "@/assets/svg/Homeprofile";
import Plus from "@/assets/svg/Plus";
import { useRouter } from "expo-router";
import { useAxiosInstance } from "@/constants/axiosInstance"; // Use your axios instance
import useAuthStore from "@/store";
import LogOut from "@/assets/svg/LogOut";
import UserTag from "@/assets/svg/UserTag";

interface CustomSideModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
}

const CustomSideModal: React.FC<CustomSideModalProps> = ({
  isVisible,
  onClose,
  title,
}) => {
  const [cooperatives, setCooperatives] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const axiosInstance = useAxiosInstance();
  const router = useRouter();
  const {
    setCooperativeUUID,
    setCooperativeName,
    logout,
    SetCoopUniqueId,
  } = useAuthStore();

  const fetchCooperatives = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/users/cooperatives");
      // console.log("My response", response.data);
      setCooperatives(response.data);
    } catch (err) {
      setError("Failed to load cooperatives");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isVisible) {
      fetchCooperatives();
    }
  }, [isVisible]);

  const handleLogout = async () => {
    logout();
    router.replace("/(auth)/(member)/sign-in");
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      className="relative"
    >
      <View className="bg-[#1D2128] h-screen absolute -bottom-[20px] -left-[20px] right-16 flex flex-col items-start">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 300 }}
          className="p5"
        >
          <View className="w-full">
            <Text className="text-white font-bold text-xl py-4 border-b px-5 border-[#DADADA] w-[350px]">
              {title}
            </Text>

            {/* Loading Indicator */}
            <View className="mt-4 w-full px-5">
              {loading && <ActivityIndicator size="large" color="#fff" />}
            </View>

            <View className="mt-4 w-full px-5">
              {error && (
                <Text className="text-red-500 text-lg py-4">{error}</Text>
              )}
            </View>

            {!loading && !error && (
              <View className="flex flex-col gap-7 px-5 w-full">
                {cooperatives.map((coop, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setCooperativeUUID(coop.cooperative.uuid);
                      setCooperativeName(coop.cooperative.name);
                      SetCoopUniqueId(coop.cooperative.uniqueId);
                      router.replace(
                        `/(root)/(manager-tabs)/${coop.cooperative.uuid}`
                      );
                    }}
                    key={index}
                    className="flex flex-row justify-between items-center w-full pr-2"
                  >
                    <View className="flex flex-row items-center gap-2">
                      <Homeprofile />
                      <View className="flex flex-col">
                        <Text className="text-white text-lg font-bold">
                          {coop.cooperative.name}
                        </Text>
                        <Text className="text-[#DADADA]">
                          {coop.cooperative.regNo}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </ScrollView>

        {/* Bottom Buttons */}
        <View className="absolute flex flex-col gap-y-5 bottom-0 px-3 bg-[#1D2128] border-t border-gray-300/50 w-full h-[250px]">
          <TouchableOpacity
            onPress={() =>
              router.push("/(auth)/(member)/(join)/become-memeber")
            }
            className="flex gap-x-4 flex-row"
          >
            <Plus width={16} height={16} />
            <Text className="text-white text-[16px] whitespace-nowrap">
              Join a cooperative
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              router.push("/(auth)/(manager)/(registerstages)/registerstages")
            }
            className="flex gap-x-4 flex-row"
          >
            <Plus width={16} height={16} />
            <Text className="text-white text-[16px] whitespace-nowrap">
              Register a cooperative
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.replace("/(root)/(tabs)/home")}
            className="flex gap-x-4 flex-row items-center"
          >
            <UserTag />
            <Text className="text-white text-[16px] whitespace-nowrap">
              Home Tab
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogout}
            className="flex gap-x-4 flex-row items-center"
          >
            <LogOut />
            <Text className="text-white text-[16px] whitespace-nowrap">
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomSideModal;
