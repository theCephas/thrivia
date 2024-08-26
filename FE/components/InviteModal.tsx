import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import * as DocumentPicker from "expo-document-picker";
import CustomButton from "./CustomButton";
import Arrowright2 from "@/assets/svg/Arrorright2";

interface InviteModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const InviteModal: React.FC<InviteModalProps> = ({ isVisible, onClose }) => {
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [
    selectedFile,
    setSelectedFile,
  ] = useState<DocumentPicker.DocumentPickerResult | null>(null);

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      // type: "text/csv",
      copyToCacheDirectory: true,
    });

    // if (result.assets?.values.name === "success") {

    // } else {
    //   // Handle cancellation or error
    //   setIsConfirmVisible(false);
    //   setSelectedFile(null);
    // }
    setSelectedFile(result);
    setIsConfirmVisible(true);
  };

  const handleConfirmUpload = () => {
    // Handle the confirmed upload here
    console.log("File uploaded:", selectedFile);
    setIsConfirmVisible(false);
    onClose();
  };

  const handleCancelUpload = () => {
    setSelectedFile(null);
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
          <Text className="text-primary font-bold text-[20px] text-center my-[20px]">
            Add Members
          </Text>
          <TouchableOpacity
            className="w-full flex-1 flex-row px-6 justify-between"
            onPress={pickDocument}
          >
            <View>
              <Text className="text-xl">CSV File Upload</Text>
              <Text className="text-[#939090] text-[17px]">
                Upload membership CSV file
              </Text>
            </View>

            <View className="mt-3">
              <Arrowright2 />
            </View>
          </TouchableOpacity>
          <View className="w-full flex-1 flex-row px-6 justify-between">
            <View className="w-[240px]">
              <Text className="text-xl">Copy Unique ID</Text>
              <Text className="text-[#939090] text-[17px]">
                Copy unique id, share, and add members.
              </Text>
            </View>
            <View className="mt-3">
              <Arrowright2 />
            </View>
          </View>
        </View>
      </Modal>

      {/* {selectedFile?.output?.item.name && ( */}
      <Modal
        isVisible={isConfirmVisible}
        onBackdropPress={handleCancelUpload}
        onBackButtonPress={handleCancelUpload}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View className="bg-white h-[200px] flex items-center rounded-[8px] w-full ">
          <Text className="text-primary font-bold text-[20px] text-center my-[20px]">
            Upload document?
          </Text>
          <View>
            <Text>{selectedFile?.output?.item.length}</Text>
          </View>
          <Text className="text-center text-lg w-[300px] my-[20px]">
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
