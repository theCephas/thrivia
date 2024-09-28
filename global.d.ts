import "expo-constants";

declare module "expo-constants" {
  interface ManifestExtra {
    EXPO_PUBLIC_MONNIFY_KEY: string;
    EXPO_PUBLIC_CONTRACT_CODE: string;
  }
}
