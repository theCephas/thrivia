import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import Homeprofile from "../assets/svg/Homeprofile";
import Plus from "../assets/svg/Plus";
import { useRouter } from "expo-router";
import useAuthStore from "../store";
import LogOut from "../assets/svg/LogOut";
import useFetchCoop from "../constants/useFetchCoop";
import { useAxiosInstance } from "../constants/axiosInstance";
import { useState } from "react";

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
  const router = useRouter();
  const {
    setCooperativeUUID,
    setCooperativeName,
    SetCoopUniqueId,
    setRole,
    setCooperativeEmail,
    logout,
  } = useAuthStore();

  const { loadingCoop, cooperatives, error } = useFetchCoop();
  const axiosInstance = useAxiosInstance();
  const [selectedCoop, setSelectedCoop] = useState<any>(null); // State to track the selected cooperative

  const handleLogout = async () => {
    logout();
    router.replace("/(auth)/(member)/sign-in");
  };

  const handleCooperativeSelect = (coop: any) => {
    try {
      // Set the active cooperative on the server
      axiosInstance.post("/users/set-active-cooperative", {
        coopUuid: coop.cooperative.uuid,
      });
      // Set cooperative details in the state
      setCooperativeUUID(coop.cooperative.uuid);
      setCooperativeName(coop.cooperative.name);
      SetCoopUniqueId(coop.cooperative.uniqueId);
      setRole(coop.role);
      setCooperativeEmail(coop.cooperative.contactEmail);

      // Set selected cooperative in local state
      setSelectedCoop(coop.cooperative.uuid);

      // Close the modal

      onClose();

      // Navigate to the correct cooperative page
      if (coop.role === "MANAGER") {
        router.replace(`/(root)/(manager-tabs)/${coop.cooperative.uuid}`);
      } else {
        router.replace(`/(root)/(tabs)/home`);
      }
    } catch (error) {
      console.error("Error setting active cooperative", error);
    }
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
        <ScrollView contentContainerStyle={{ paddingBottom: 300 }}>
          <View className="w-full">
            <Text className="text-white   text-[16px] font-Onest py-4 border-b px-5 border-[#DADADA] w-[350px]">
              {title}
            </Text>

            {/* Loading Indicator */}
            <View className="mt-4 w-full px-5">
              {loadingCoop && <ActivityIndicator size="large" color="#fff" />}
            </View>

            {/* Error Display */}
            <View className="mt-4 w-full px-5">
              {error && (
                <Text className="text-red-500 text-lg font-Onest py-4">
                  {error}
                </Text>
              )}
            </View>

            {!loadingCoop && !error && (
              <View className="flex flex-col gap-7 w-full">
                {cooperatives.length > 0 ? (
                  <>
                    {cooperatives.map((coop, index) => (
                      <TouchableOpacity
                        onPress={() => handleCooperativeSelect(coop)}
                        key={index}
                        className={`flex flex-row justify-between items-center w-full ${
                          selectedCoop === coop.cooperative.uuid
                            ? "bg-primary"
                            : ""
                        }`}
                      >
                        <View className="flex flex-row items-center gap-2 py-2 px-5">
                          <Homeprofile />
                          <View className="flex flex-col">
                            <Text className="text-white text-[16px] font-Onest  ">
                              {coop.cooperative.name}
                            </Text>
                            <Text className="text-[#DADADA] font-Onest text-[10px]">
                              {coop.cooperative.slug}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </>
                ) : (
                  <View className="px-5">
                    <Text className="text-white text-lg font-Onest  ">
                      No cooperatives yet
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </ScrollView>

        {/* Bottom Buttons */}
        <View className="absolute flex flex-col gap-y-5 bottom-0 px-3 bg-[#1D2128] border-t border-gray-300/50 w-full h-[150px]">
          <TouchableOpacity
            onPress={() => router.push("/(auth)/(member)/(join)/join-stages")}
            className="flex gap-x-4 flex-row"
          >
            <Plus width={16} height={16} />
            <Text className="text-white text-[14px] font-Onest  whitespace-nowrap">
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
            <Text className="text-white text-[14px] font-Onest whitespace-nowrap">
              Register a cooperative
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogout}
            className="flex gap-x-4 flex-row items-center"
          >
            <LogOut />
            <Text className="text-white text-[14px] font-Onest  whitespace-nowrap">
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomSideModal;
