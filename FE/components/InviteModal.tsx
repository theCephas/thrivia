import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import * as DocumentPicker from "expo-document-picker";
import Arrowright2 from "../assets/svg/Arrorright2";
import useAuthStore from "../store";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";

interface InviteModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const InviteModal: React.FC<InviteModalProps> = ({ isVisible, onClose }) => {
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const { copUniqueId } = useAuthStore();
  const [
    selectedFile,
    setSelectedFile,
  ] = useState<DocumentPicker.DocumentPickerResult | null>(null);

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      // type: "text/csv",
      copyToCacheDirectory: true,
    });
    setSelectedFile(result);
    setIsConfirmVisible(true);
  };

  const handleConfirmUpload = () => {
    // Handle the confirmed upload here

    setIsConfirmVisible(false);
    onClose();
  };

  const handleCancelUpload = () => {
    setSelectedFile(null);
    setIsConfirmVisible(false);
  };

  const handleCopyId = async () => {
    if (copUniqueId) {
      await Clipboard.setStringAsync(copUniqueId);
      Toast.show({
        type: "success",
        text1: "ID copied to clipboard",
      });
    }
    setIsConfirmVisible(false);
  };
  return (
    <>
      <Modal
        isVisible={isVisible && !isConfirmVisible}
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View className="bg-white h-[200px] flex items-center rounded-t-[30px] w-full absolute bottom-[-20px]">
          <View className="w-[50px] h-[5px] rounded-full bg-primary mt-[2px]" />
          <Text className="text-primary   text-[14px] font-Onest text-center my-[20px]">
            Add Members
          </Text>
          <TouchableOpacity
            className="w-full flex-1 flex-row px-6 justify-between hidden"
            onPress={pickDocument}
          >
            <View className="">
              <Text className="text-xl">CSV File Upload</Text>
              <Text className="text-[#939090] text-[17px]">
                Upload membership CSV file
              </Text>
            </View>

            <View className="mt-3">
              <Arrowright2 />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleCopyId}
            className="w-full flex-1 flex-row px-6 mt-4 justify-between"
          >
            <View className="w-[240px]">
              <Text className="text-xl font-OnestSemiBold">Copy Unique ID</Text>
              <Text className="text-[#939090] font-Onest text-[12px]">
                Copy unique id, share, and add members.
              </Text>
            </View>
            <View className="mt-3">
              <Arrowright2 />
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <Toast position="top" topOffset={100} />
      {/* {selectedFile?.output?.item.name && ( */}
      <Modal
        isVisible={isConfirmVisible}
        onBackdropPress={handleCancelUpload}
        onBackButtonPress={handleCancelUpload}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View className="bg-white h-[200px] flex items-center rounded-[8px] w-full ">
          <Text className="text-primary   text-[20px] text-center my-[20px]">
            Upload document?
          </Text>
          <View>
            <Text>{selectedFile?.output?.item.length}</Text>
          </View>
          <Text className="text-center text-lg font-Onest w-[300px] my-[20px]">
            Are you sure you want to upload this list of members?
          </Text>

          <View className="flex flex-row w-full justify-between pt-2 px-12">
            <TouchableOpacity onPress={handleCancelUpload}>
              <Text className="text-lg">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirmUpload}>
              <Text className="text-primary font-semibold text-lg">Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* )} */}
    </>
  );
};

export default InviteModal;
