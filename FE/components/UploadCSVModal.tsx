import React from "react";
import { View } from "react-native";
import Modal from "react-native-modal";

interface UploadCSVModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const UploadCSVModal: React.FC<UploadCSVModalProps> = ({
  isVisible,
  onClose,
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
      <View className="bg-white h-[332px] p-5 rounded-t-[30px] w-full absolute bottom-[-20px]"></View>
    </Modal>
  );
};

export default UploadCSVModal;
