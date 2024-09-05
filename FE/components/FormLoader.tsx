import { ActivityIndicator, View } from "react-native";

const FormLoader = () => {
  return (
    <View className="backdrop-blur-lg bg-black/50 absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center">
      <ActivityIndicator size="large" color="#FFFFFF" />
    </View>
  );
};

export default FormLoader;
