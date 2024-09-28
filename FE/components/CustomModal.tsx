import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import CustomButton from "./CustomButton";

interface CustomModalProps {
  isVisible: boolean;
  onClose?: () => void;
  OnNext?: () => void;
  title: string;
  message: string;
  id?: string | null;
  buttonText?: string;
  buttonTextCancel?: string;
  onButtonPress: () => void;
  UI?: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isVisible,
  onClose,
  OnNext,
  title,
  message,
  id,
  buttonText,
  buttonTextCancel,
  onButtonPress,
  UI,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      className="relative"
    >
      <View className="bg-white p-5 rounded-t-[30px] w-full absolute bottom-[-20px]">
        <Text className="text-primary   text-[14px] font-Onest text-center mb-[20px]">
          {title}
        </Text>
        <Text className="leading-[17.85px] text-center w-[300px] text-[#656565] ">
          {message}
        </Text>
        {id && (
          <Text className="text-center   text-[25px] font-Onest  mt-10 text-[#656565] ">
            {id}
          </Text>
        )}
        {UI}
        {buttonText && (
          <View className="mt-8">
            <CustomButton title={buttonText} onPress={OnNext && OnNext} />
          </View>
        )}
        {buttonTextCancel && (
          <TouchableOpacity
            onPress={onButtonPress}
            className={`w-full p-3 rounded-full flex flex-row justify-center items-center h-[44px] border border-primary`}
          >
            <Text className="text-[#0D1015]">{buttonTextCancel}</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  //   modalContainer: {
  //     backgroundColor: "#1d2128",
  //     padding: 20,
  //     borderRadius: 10,
  //     alignItems: "center",
  //   },
  //   modalTitle: {
  //     fontSize: 20,
  //     fontWeight: "bold",
  //     marginBottom: 10,
  //     color: "white",
  //   },
  //   modalMessage: {
  //     fontSize: 16,
  //     marginBottom: 20,
  //     color: "white",
  //     textAlign: "center",
  //   },
  //   button: {
  //     backgroundColor: "#ff6347",
  //     paddingVertical: 10,
  //     paddingHorizontal: 20,
  //     borderRadius: 8,
  //   },
  //   buttonText: {
  //     color: "white",
  //     fontSize: 16,
  //   },
});

export default CustomModal;
