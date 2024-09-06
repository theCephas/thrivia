import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, PersistOptions } from "zustand/middleware";
import { useAxiosInstance } from "@/constants/axiosInstance";

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

      login: (token: any, expiresIn: string, user: any) => {
        // console.log(token, expiresIn);
        const expireAt = expiresIn;
        set({ token, expireAt, user });
      },

      logout: () =>
        set({
          token: null,
          expireAt: null,
          user: null,
          cooperativeName: null,
          coopUUID: null,
          coopUniqueId: null,
          cooperativeUUID: null,
          copUniqueId: null,
        }),

      setCooperativeName: (name: string) => set({ cooperativeName: name }),
      setCoopUUID: (uuid: string) => set({ coopUUID: uuid }),
      setUniqueId: (uniqueId: string) => set({ coopUniqueId: uniqueId }),
      setCooperativeUUID: (uuid: string) => set({ cooperativeUUID: uuid }),
      SetCoopUniqueId: (uniqueId: string) => set({ copUniqueId: uniqueId }),
      refreshToken: async () => {
        try {
          const newToken = await Api().post("");
          const decodedToken = newToken;
          const expireAt = decodedToken;
          set({ token: newToken, expireAt });
        } catch (error) {
          console.error("Failed to refresh token:", error);
          set({ token: null, expireAt: null });
        }
      },

      isTokenExpired: () => {
        const state = useAuthStore.getState();
        return state.expireAt !== null && Date.now() > +state.expireAt;
      },

      checkTokenExpiration: async () => {
        const state = useAuthStore.getState();
        if (state.isTokenExpired()) {
          await state.refreshToken();
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
