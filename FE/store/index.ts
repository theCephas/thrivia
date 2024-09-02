import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, PersistOptions } from "zustand/middleware";
import axiosInstance from "@/constants/axiosInstance";
import { StateCreator } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  token: any | null;
  expireAt: any | null;
  login: (token: string, expireIn: string) => void;
  logout: () => void;
  refreshToken: () => Promise<void>;
  isTokenExpired: () => any;
  checkTokenExpiration: () => Promise<void>;
}

const useAuthStore = create(
  persist(
    (set, _get) => ({
      isLoggedIn: false,
      token: null,
      expireAt: null,

      login: (token: string, expiresIn: string) => {
        // console.log(token, expiresIn);
        const expireAt = expiresIn;
        set({ isLoggedIn: true, token, expireAt });
      },

      logout: () => set({ isLoggedIn: false, token: null, expireAt: null }),

      refreshToken: async () => {
        try {
          const newToken = await axiosInstance.post("");
          const decodedToken = newToken;
          const expireAt = decodedToken;
          set({ token: newToken, expireAt });
        } catch (error) {
          console.error("Failed to refresh token:", error);
          set({ isLoggedIn: false, token: null, expireAt: null });
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
