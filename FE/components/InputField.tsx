import React, { useState, useEffect } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Animated,
  StyleSheet,
  Text,
} from "react-native";
import { InputFieldProps } from "../types/type";

const InputField = ({
  placeholder,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  labelStyle,
  className,
  icon: Icon,
  iconStyle,
  value,
  keyboardType = "default",
  ...props
}: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const animatedIsFocused = useState(new Animated.Value(value ? 1 : 0))[0];

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animatedIsFocused, isFocused, value]);

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
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
      outputRange: [14, 14],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ["#aaa", "#aaa"],
    }),
    fontFamily: "Onest",
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <View
            className={`flex flex-row justify-start items-center relative border-b border-white ${containerStyle}`}
          >
            <Animated.Text style={[animatedLabelStyle, styles.placeholder]}>
              {placeholder}
            </Animated.Text>
            {Icon && (
              // <View">
              <Text className="border-r border-white mt-6 p-2">
                <Icon style={[{ width: 20, height: 20 }, iconStyle]} />
              </Text>
              // </View>
            )}
            <TextInput
              style={styles.input}
              className={`rounded-full text-[14px] font-Onest text-white flex-1 ${inputStyle}`}
              secureTextEntry={secureTextEntry}
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={value}
              keyboardType={keyboardType}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 20,
    paddingBottom: 0,
    fontSize: 14,
    fontFamily: "Onest",
  },
  placeholder: {
    position: "absolute",
    left: 60,
  },
});

export default InputField;
