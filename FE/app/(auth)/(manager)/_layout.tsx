import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(registerstages)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
