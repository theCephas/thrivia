import OnboardingBg from "@/assets/svg/OnboardingBg";
import Thrivia from "@/assets/svg/Thrivia";
import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";
import useAuthStore from "@/store";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import Swiper from "react-native-swiper";

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { token } = useAuthStore();
  const isLastSlide = activeIndex === onboarding.length - 1;

  useEffect(() => {
    if (token) {
      router.replace("/(root)/(tabs)/home");
    }
  }, [token]);

  return (
    <View className="">
      <View className="w-full top-[-20px] h-full">
        <OnboardingBg width={400} height={900} />
      </View>
      <LinearGradient
        colors={[
          "rgba(29, 33, 40, 0.1)",
          "rgba(29, 33, 40, 0.8)",
          "rgba(1, 1, 1, 1)",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="flex absolute w-full top-0 h-full font-Onest p-5 justify-between"
      >
        <View className="mt-20">
          <Thrivia />
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
                <Text className="text-white font-onest font-bold text-3xl text-left">
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
              ? router.replace("/(auth)/(member)/sign-up")
              : swiperRef.current?.scrollBy(1)
          }
          className={"w-11/12 mt-16 m-auto mb-6"}
        />
        <View className="flex items-center justify-center mb-8">
          <Link href={"/(auth)/(member)/sign-in"} className="text-white">
            Already have an account?{" "}
            <Text className="text-primary">Log in</Text>
          </Link>
        </View>
        {/* </View> */}
      </LinearGradient>
    </View>
  );
};

export default Welcome;
