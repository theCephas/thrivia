import useAuthStore from "@/store";
import { Stack } from "expo-router";

const Layout = () => {
  const { isLoggedIn } = useAuthStore();
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="(join)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
