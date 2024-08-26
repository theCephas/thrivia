import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="become-memeber" options={{ headerShown: false }} />
      <Stack.Screen name="join-stages" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
