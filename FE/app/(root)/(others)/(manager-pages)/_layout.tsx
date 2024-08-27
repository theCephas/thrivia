import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="loan-requests" options={{ headerShown: false }} />
      <Stack.Screen
        name="loan-request-details"
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="approve-loan" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
