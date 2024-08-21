import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#1d2128] items-center justify-center">
      <Text className="text-2xl">Home</Text>
    </SafeAreaView>
  );
};

export default Home;
