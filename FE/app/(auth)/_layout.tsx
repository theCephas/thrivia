import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      {/* <Stack.Screen name="signin-options" options={{ headerShown: false }} /> */}
      <Stack.Screen name="(manager)" options={{ headerShown: false }} />
      <Stack.Screen name="(member)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
