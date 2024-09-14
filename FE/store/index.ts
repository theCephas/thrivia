import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, PersistOptions } from "zustand/middleware";
import { useAxiosInstance } from "@/constants/axiosInstance";
import { router } from "expo-router";

interface AuthState {
  token: any | null;
  expireAt: any | null;
  login: (token: any, expireIn: string, user: any) => void;
  logout: () => void;
  refreshToken: () => Promise<void>;
  isTokenExpired: () => any;
  checkTokenExpiration: () => Promise<void>;
  user: any | null;
  setCooperativeName: (name: string) => void;
  setCoopUUID: (uuid: string) => void;
  setUniqueId: (uniqueId: string) => void;
  setCooperativeUUID: (uuid: string) => void;
  SetCoopUniqueId: (uniqueId: string) => void;
  copUniqueId: string | null;
  cooperativeUUID: string | null;
  coopUUID: string | null;
  coopUniqueId: string | null;
  cooperativeName: string | null;
  setActiveCooperative: (coopUuid: string, name: string, email: string) => void;
  coopUuid: string | null;
  coopName: string | null;
  activeCooperative: string | null;
  setCooperativeEmail: (contactEmail: string) => void;
  cooperativeEmail: string | null;
  setUserUuid: (uuid: string) => void;
  userUuid: string | null;
  setRole: (role: string) => void;
  role: string | null;
  setWalletUuid: (uuid: string) => void;
  walletUuid: string | null;
  setUser: (user: any) => void;
}

const Api = () => {
  const axiosInstance = useAxiosInstance();
  return axiosInstance;
};

const useAuthStore = create(
  persist(
    (set, _get) => ({
      token: null,
      expireAt: null,
      user: null,
      cooperativeName: null,
      coopUUID: null,
      coopUniqueId: null,
      cooperativeUUID: null,
      copUniqueId: null,
      activeCooperative: null,
      coopName: null,
      coopUuid: null,
      cooperativeEmail: null,
      userUuid: null,
      role: null,
      walletUuid: null,

      login: (token: any, expiresIn: string, user: any) => {
        const expireAt = expiresIn;
        set({
          token,
          expireAt,
          user,
          userUuid: user.uuid,
          coopName: user?.activeCooperative?.name || null,
          coopUuid: user?.activeCooperative?.uuid || null,
          activeCooperative: user?.activeCooperative?.uuid || null,
        });
      },

      logout: () => {
        set({
          token: null,
          expireAt: null,
          user: null,
          cooperativeName: null,
          coopUUID: null,
          coopUniqueId: null,
          cooperativeUUID: null,
          copUniqueId: null,
          activeCooperative: null,
          coopName: null,
          coopUuid: null,
          cooperativeEmail: null,
          userUuid: null,
          role: null,
          walletUuid: null,
        });
      },

      setUser(user) {
        set({
          user: user,
        });
      },
      setCooperativeName: (name: string) => set({ cooperativeName: name }),
      setCoopUUID: (uuid: string) => set({ coopUUID: uuid }),
      setUniqueId: (uniqueId: string) => set({ coopUniqueId: uniqueId }),
      setCooperativeUUID: (uuid: string) => set({ cooperativeUUID: uuid }),
      SetCoopUniqueId: (uniqueId: string) => set({ copUniqueId: uniqueId }),
      setCooperativeEmail(contactEmail) {
        set({
          cooperativeEmail: contactEmail,
        });
      },
      setActiveCooperative: (coopUuid: string, name: string) => {
        set({
          coopUuid: coopUuid,
          coopName: name,
          activeCooperative: coopUuid,
        });
      },

      setUserUuid(uuid) {
        set({ userUuid: uuid });
      },
      setRole(role) {
        set({ role: role });
      },
      setWalletUuid(uuid) {
        set({ walletUuid: uuid });
      },

      refreshToken: async () => {
        try {
          const newToken = await Api().post("/auth/refresh");
          const decodedToken = newToken;
          const expireAt = decodedToken;
          set({ token: newToken, expireAt });
        } catch (error) {
          console.error("Failed to refresh token:", error);
          set({ token: null, expireAt: null });
          router.replace("/(auth)/(member)/sign-in");
        }
      },

      isTokenExpired: () => {
        const state = useAuthStore.getState();
        return state.expireAt !== null && Date.now() > +state.expireAt;
      },

      checkTokenExpiration: async () => {
        const { isTokenExpired, refreshToken, logout } = _get();
        if (isTokenExpired()) {
          try {
            await refreshToken(); // Try to refresh the token
          } catch {
            logout(); // If refresh fails, logout and redirect to login page
          }
        }
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => AsyncStorage,
    } as PersistOptions<AuthState>
  )
);

export default useAuthStore;
