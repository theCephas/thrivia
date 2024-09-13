import React, { useState, useEffect } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { InputFieldProps } from "@/types/type"; // Adjust this import to your needs
import { LinearGradient } from "expo-linear-gradient";
import ArrowDown from "@/assets/svg/ArrowDown";
import Modal from "react-native-modal";

interface DropdownProps extends InputFieldProps {
  options: string[];
  onSelect: (value: string) => void;
}

const Dropdown = ({
  placeholder,
  containerStyle,
  labelStyle,
  icon: Icon,
  iconStyle,
  value,
  options,
  onSelect,
  ...props
}: DropdownProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const animatedIsFocused = useState(new Animated.Value(value ? 1 : 0))[0];

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsOpen(false);
  };

  const handleSelect = (selectedValue: string) => {
    onSelect(selectedValue);
    setIsOpen(false);
    handleBlur();
  };

  const animatedLabelStyle = {
    position: "absolute" as "absolute",
    left: Icon ? 50 : 16,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1.5],
      outputRange: [30, 0],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 14],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ["#aaa", "#aaa"],
    }),
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <TouchableOpacity
            onPress={() => setIsOpen(!isOpen)}
            activeOpacity={0.8}
          >
            <View
              className={`flex flex-row justify-start items-center relative border-b border-white ${containerStyle}`}
            >
              <Animated.Text style={[animatedLabelStyle, styles.placeholder]}>
                {placeholder}
              </Animated.Text>
              {Icon && (
                <Text className="border-r border-white mt-6 p-2">
                  <Icon style={[{ width: 20, height: 20 }, iconStyle]} />
                </Text>
              )}
              <Text
                style={styles.input}
                className={`rounded-full text-[15px] text-white flex-1 ${labelStyle}`}
              >
                {value || ""}
              </Text>
              <View>
                <ArrowDown />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
      <Modal
        isVisible={isOpen}
        onBackdropPress={() => setIsOpen(false)}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        className="relative"
      >
        <View className="bg-white p-5 h-[600px] w-full bottom-[-20px] absolute overflow-scroll rounded-lg items-center">
          <Text className="text-lg font-bold mb-3">{placeholder}</Text>
          <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
            {options.map((item, index) => (
              <TouchableOpacity
                className="py-3 w-full border-b border-gray-300"
                key={index}
                onPress={() => handleSelect(item)}
              >
                <Text className="text-base text-black">{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 20,
    paddingBottom: 0,
    fontSize: 16,
  },
  placeholder: {
    position: "absolute",
    left: 60,
  },
  //   dropdown: {
  //     borderWidth: 1,
  //     borderColor: "white",
  //     borderRadius: 8,
  //     backgroundColor: "#333",
  //     marginTop: 8,
  //   },
  //   option: {
  //     paddingVertical: 10,
  //     paddingHorizontal: 16,
  //     borderBottomColor: "white",
  //     borderBottomWidth: 1,
  //   },
  optionText: {
    fontSize: 18,
    color: "white",
  },
});

export default Dropdown;
