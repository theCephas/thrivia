import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="add-money" options={{ headerShown: false }} />
      <Stack.Screen name="(manager-pages)" options={{ headerShown: false }} />
      <Stack.Screen name="(member-loan)" options={{ headerShown: false }} />
      <Stack.Screen name="(member-withdraw)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(manager-withdraw)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
