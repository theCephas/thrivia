import Finance from "@/assets/svg/Finance";
import Home from "@/assets/svg/Home";
import People from "@/assets/svg/People";
import Profile from "@/assets/svg/Profile";
import useAuthStore from "@/store";
import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { SvgProps } from "react-native-svg";

const TabIcon = ({
  Icon, // Expect a React component for the icon
  focused,
  label,
}: {
  Icon: React.ComponentType<SvgProps>;
  focused: boolean;
  label: string;
}) => (
  <View
    className={`flex flex-row justify-center items-center rounded-full ${
      focused ? "bg-primary" : ""
    }`}
  >
    <View
      className={`w-12 h-12 items-center justify-center ${
        focused ? "border-b-primary border-b-2 w-[45px] font-bold" : ""
      }`}
    >
      <Icon width={24} height={24} stroke={focused ? "white" : "#939090"} />
      <Text
        className={`text-xs mt-1 ${
          focused ? "text-white font-bold" : "text-[#aaa]"
        }`}
      >
        {label}
      </Text>
    </View>
  </View>
);

export default function Layout() {
  const router = useRouter();

  const { user, token } = useAuthStore();

  // useEffect(() => {
  //   // !token || !user
  //   //   ? router.replace("/(auth)/(member)/sign-in")
  //   //   : router.replace("/(root)/(tabs)/home");
  //   if (token) {
  //     router.replace("/(root)/(tabs)/home");
  //   } else {
  //     router.replace("/(auth)/(member)/sign-in");
  //   }
  // }, [token]);
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#0D1015",
          paddingBottom: 0, // ios only
          overflow: "hidden",
          height: 78,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          width: "100%",
          borderTopWidth: 0,
          // borderTopColor: "white",
          // borderLeftColor: "white",
          // borderRightColor: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Home" Icon={Home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="finance"
        options={{
          title: "Finance",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Finance" Icon={Finance} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "Community",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Community" Icon={People} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Profile" Icon={Profile} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
