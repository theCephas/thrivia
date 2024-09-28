import Finance from "@/assets/svg/Finance";
import HomeSvg from "@/assets/svg/Home";
import People from "@/assets/svg/People";
import Profile from "@/assets/svg/Profile";
import useAuthStore from "@/store";
import { Redirect, Tabs, useRouter } from "expo-router"; // import useRouter to navigate
import { useEffect } from "react";
import { Text, View } from "react-native";
import { SvgProps } from "react-native-svg";
import Home from "./home";

const TabIcon = ({
  Icon,
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
        focused ? "border-b-primary border-b-2 w-[45px]  " : ""
      }`}
    >
      <Icon width={24} height={24} stroke={focused ? "white" : "#939090"} />
      <Text
        className={`text-[10px] font-Onest mt-1 ${
          focused ? "text-white  " : "text-[#aaa]"
        }`}
      >
        {label}
      </Text>
    </View>
  </View>
);

export default function Layout() {
  const { user, logout, isTokenExpired } = useAuthStore();
  const router = useRouter();

  return user?.activeCooperative ? (
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
            <TabIcon label="Home" Icon={HomeSvg} focused={focused} />
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
  ) : (
    <Home />
  );
}
