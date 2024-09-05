// navigationHelper.ts
import { useRouter } from "expo-router";

export const navigateToSignIn = () => {
  const router = useRouter();
  router.replace("/(auth)/(member)/sign-in");
};
