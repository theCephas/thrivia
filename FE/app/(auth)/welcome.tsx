import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";
import { Link, router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex relative h-full font-Onest bg-gradient-to-b from-[#1D2128]/40 to-[#010101] bg-[#1D2128] p-5 justify-between">
      {/* <View className="relative">
        <Image
          source={require("@/assets/images/thriviacoins.jpg")}
          className="h-full w-fit"
        />
      </View> */}
      {/* <View className="absolute"> */}
      <View className="mt-10">
        <Image source={require("@/assets/images/thrivia.png")} className="" />
      </View>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[50px] h-[4px] mx-1 bg-[#939090]  rounded-full mb-6" />
        }
        activeDot={
          <View className="w-[50px] h-[4px] mx-1 bg-primary rounded-full mb-6" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex flex-col relative">
            <View className="absolute bottom-[-460px]">
              <Text className="text-white font-bold text-3xl text-left">
                {" "}
                {item.title}
              </Text>
              <Text className="text-lg text-left text-white mt-3">
                {" "}
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </Swiper>

      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/signin-options")
            : swiperRef.current?.scrollBy(1)
        }
        className={"w-11/12 mt-16 m-auto mb-6"}
      />
      <View className="flex items-center justify-center mb-8">
        <Link href={"/(auth)/(member)/sign-in"} className="text-white">
          Already have an account? <Text className="text-primary">Log in</Text>
        </Link>
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
};

export default Welcome;
