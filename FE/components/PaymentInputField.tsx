import { useEffect, useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";

interface PaymentInputProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  focusOnInit: boolean;
}

// apiKey: "MK_PROD_GSXRRTTKLT",
//     contractCode: "896041207144",

const PaymentInputField = ({
  value,
  setValue,
  focusOnInit,
}: PaymentInputProps) => {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!focusOnInit) return;
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [focusOnInit]);

  const handleChangeText = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, ""); // Remove any non-numeric characters
    setValue(Number(numericValue));
  };
  return (
    <View className="mt-14 px-6 w-full">
      <Text className="text-xl text-white mb-3">Enter amount</Text>
      <View className="flex flex-row h-10 w-full items-end">
        <Text className="text-lg text-white pb-1 px-1 mr-4 border-b border-[#939090]">
          NGN
        </Text>

        <TextInput
          ref={inputRef}
          value={value.toString()}
          onChangeText={handleChangeText}
          keyboardType="numeric"
          placeholder="0.00"
          placeholderTextColor="#939090"
          className="text-white text-2xl border-b border-[#939090] flex-grow"
        />
      </View>
    </View>
  );
};

export default PaymentInputField;
