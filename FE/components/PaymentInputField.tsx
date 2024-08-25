import { useEffect, useRef } from "react";
import { Text, TextInput, View } from "react-native";

interface PaymentInputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  focusOnInit: boolean;
}

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
  return (
    <View className="mt-14 px-6 w-full">
      <Text className="text-xl text-white mb-3">Enter amount</Text>
      <View className="flex flex-row h-10 w-full items-end">
        <Text className="text-lg text-white pb-1 px-1 mr-4 border-b border-[#939090]">
          NGN
        </Text>

        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={(text) => setValue(text)}
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
