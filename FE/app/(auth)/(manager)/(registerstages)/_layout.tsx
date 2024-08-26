import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="registerstages" options={{ headerShown: false }} />
      {/* <Stack.Screen name="registerstage1" options={{ headerShown: false }} />
      <Stack.Screen name="registerstage2" options={{ headerShown: false }} />
      <Stack.Screen name="registerstage3" options={{ headerShown: false }} /> */}
    </Stack>
  );
};

export default Layout;
