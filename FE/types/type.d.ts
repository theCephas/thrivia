import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  fontVariant?: "Onest" | "default";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

declare interface InputFieldProps extends TextInputProps {
  placeholder: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
  // keyboardType?: undefine;
}
