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
  setActiveCooperative: (coopUuid: string, name: string) => void;
  coopUuid: string | null;
  coopName: string | null;
  activeCooperative: string | null;
  setUserUuid: (uuid: string) => void;
  userUuid: string | null;
  setRole: (role: string) => void;
  role: string | null;
  setWalletUuid: (uuid: string) => void;
  walletUuid: string | null;
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
      userUuid: null,
      role: null,
      walletUuid: null,

      login: (token: any, expiresIn: string, user: any) => {
        // console.log("line 52 - hook:", user);
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
          activeCooperative: null,
          coopName: null,
          coopUuid: null,
          userUuid: null,
          role: null,
          walletUuid: null,
        }),

      setCooperativeName: (name: string) => set({ cooperativeName: name }),
      setCoopUUID: (uuid: string) => set({ coopUUID: uuid }),
      setUniqueId: (uniqueId: string) => set({ coopUniqueId: uniqueId }),
      setCooperativeUUID: (uuid: string) => set({ cooperativeUUID: uuid }),
      SetCoopUniqueId: (uniqueId: string) => set({ copUniqueId: uniqueId }),
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
