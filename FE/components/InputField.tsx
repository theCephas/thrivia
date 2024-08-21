import React, { useState, useEffect } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Image,
  Animated,
  StyleSheet,
} from "react-native";
import { InputFieldProps } from "@/types/type";

const InputField = ({
  placeholder,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  labelStyle,
  className,
  icon,
  iconStyle,
  value,
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
  }, [isFocused, value]);

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  const animatedLabelStyle = {
    position: "absolute" as "absolute",
    left: icon ? 50 : 16,
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
          <View
            className={`flex flex-row justify-start items-center relative border-b border-white ${containerStyle}`}
          >
            <Animated.Text style={[animatedLabelStyle, styles.placeholder]}>
              {placeholder}
            </Animated.Text>
            {icon && (
              <View className="border-r border-white mt-6 p-2">
                <Image source={icon} className={`w-5 h-5 ml-2 ${iconStyle}`} />
              </View>
            )}
            <TextInput
              style={styles.input}
              className={`rounded-full text-[15px] text-white flex-1 ${inputStyle}`}
              secureTextEntry={secureTextEntry}
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={value}
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
    fontSize: 16,
  },
  placeholder: {
    position: "absolute",

    left: 60,
  },
});

export default InputField;
