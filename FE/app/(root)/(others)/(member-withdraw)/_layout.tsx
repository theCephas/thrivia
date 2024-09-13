import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="withdraw" options={{ headerShown: false }} />
    </Stack>
  );
}
