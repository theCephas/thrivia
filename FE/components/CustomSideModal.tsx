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
import MenuDotted from "@/assets/svg/MenuDotted";
import Plus from "@/assets/svg/Plus";
import { useRouter } from "expo-router";
import { useAxiosInstance } from "@/constants/axiosInstance"; // Use your axios instance
import useAuthStore from "@/store";

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
  // const { coopUUID } = useAuthStore();

  const fetchCooperatives = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/users/cooperatives");
      console.log(response.data);
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

  // const navigateToManagerHome = () => {
  //   if (coopUUID) {
  //     // Navigate to the dynamic manager's home with the UUID in the route
  //     router.push(`/(root)/(manager-tabs)/${coopUUID}`);
  //   } else {
  //     console.error("Cooperative UUID is not available.");
  //   }
  // };

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
          className="p-5"
        >
          <Text className="text-white font-bold text-xl py-4 border-b border-[#DADADA] w-full">
            {title}
          </Text>

          {/* Loading Indicator */}
          {loading && <ActivityIndicator size="large" color="#fff" />}

          {/* Error Message */}
          {error && <Text className="text-red-500 text-lg py-4">{error}</Text>}

          {/* Cooperatives List */}
          {!loading && !error && (
            <View className="flex flex-col gap-7 mt-2 w-full">
              {cooperatives.map((coop, index) => (
                <View
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
                  <MenuDotted />
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Bottom Buttons */}
        <View className="absolute flex flex-col gap-y-4 bottom-0 p-4 bg-[#1D2128] border-t border-gray-300/50 w-full h-[200px]">
          <TouchableOpacity
            onPress={() =>
              router.push("/(auth)/(member)/(join)/become-memeber")
            }
            className="bg-[#f4f4f4]/[15%] bg-opacity-25 rounded-[50px] border-[0.5px] border-[#e8e7e7] w-full flex flex-row justify-center gap-x-4 ml-[2px] py-4 px-8 items-center"
          >
            <Plus />
            <Text className="text-white text-xl whitespace-nowrap">
              Join a cooperative
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              router.push("/(auth)/(manager)/(registerstages)/registerstages")
            }
            className="bg-[#f4f4f4]/[15%] bg-opacity-25 rounded-[50px] border-[0.5px] border-[#e8e7e7] w-full flex flex-row justify-center gap-x-4 ml-[2px] py-4 px-8 items-center"
          >
            <Plus />
            <Text className="text-white text-xl whitespace-nowrap">
              Register a cooperative
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomSideModal;
