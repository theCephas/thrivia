import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="loan-stages" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
