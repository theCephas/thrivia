import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(manager-tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(others)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
