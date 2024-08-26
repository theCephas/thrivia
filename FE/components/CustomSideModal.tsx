import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import Homeprofile from "@/assets/svg/Homeprofile";
import MenuDotted from "@/assets/svg/MenuDotted";
import Plus from "@/assets/svg/Plus";

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
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      className="relative"
    >
      <View className="bg-[#1D2128] h-screen p-5 absolute -bottom-[20px] -left-[20px] right-16 flex flex-col items-start">
        <Text className="text-white font-bold text-xl py-4 border-b border-[#DADADA] w-full">
          {title}
        </Text>
        <View className="flex flex-col gap-7 mt-6 w-full">
          {[1, 2, 3, 4].map((num) => (
            <View
              key={num}
              className="flex flex-row justify-between items-center w-full pr-2"
            >
              <View className="flex flex-row items-center gap-2">
                <Homeprofile />
                <View className="flex flex-col">
                  <Text className="text-white text-lg font-bold">
                    Freedom Cooperative
                  </Text>
                  <Text className="text-[#DADADA]">
                    freedomcooperative.thrivia.com
                  </Text>
                </View>
              </View>
              <MenuDotted />
            </View>
          ))}
        </View>
        <TouchableOpacity className="bg-[#f4f4f4]/[15%] bg-opacity-25 rounded-[50px] border-[0.5px] border-[#e8e7e7] w-full flex flex-row justify-between mt-14 py-4 px-8 items-center">
          <Plus />
          <Text className="text-white text-xl whitespace-nowrap">
            Add another cooperative
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CustomSideModal;
