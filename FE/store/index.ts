// import { create } from "zustand";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { persist, PersistOptions } from "zustand/middleware";

// import { navigateToSignIn } from "@/utils/navigationHelper"; // Import the helper function
// import { refreshAuthToken } from "@/constants/refreshToken";

// interface AuthState {
//   token: string | null;
//   expireAt: string | null;
//   user: any | null;
//   login: (token: string, expiresIn: string, user: any) => void;
//   logout: () => void;
//   refreshToken: (newToken: string, expiresIn: string) => void;
//   isTokenExpired: () => boolean;
//   checkTokenExpiration: () => Promise<void>;
//   setCooperativeName: (name: string) => void;
//   cooperativeName: string | null;
// }

// const useAuthStore = create<AuthState>()(
//   persist(
//     (set, get) => ({
//       token: null,
//       expireAt: null,
//       user: null,
//       cooperativeName: null,

//       login: (token, expiresIn, user) => {
//         const expireAt = new Date().getTime() + Number(expiresIn) * 1000;
//         set({ token, expireAt: expireAt.toString(), user });
//       },

//       logout: async () => {
//         await AsyncStorage.removeItem("auth-storage");
//         set({ token: null, expireAt: null, user: null, cooperativeName: null });
//         // navigateToSignIn();
//       },

//       setCooperativeName: (name: string) => set({ cooperativeName: name }),

//       refreshToken: (newToken, expiresIn) => {
//         const expireAt = new Date().getTime() + Number(expiresIn) * 1000;
//         set({ token: newToken, expireAt: expireAt.toString() });
//       },

//       isTokenExpired: () => {
//         const { expireAt } = get();
//         if (!expireAt) return true;
//         return new Date().getTime() > Number(expireAt);
//       },

//       checkTokenExpiration: async () => {
//         if (get().isTokenExpired()) {
//           console.warn("Token expired, refresh needed.");
//           await refreshAuthToken();
//         }
//       },
//     }),
//     {
//       name: "auth-storage",
//       getStorage: () => AsyncStorage,
//     } as PersistOptions<AuthState>
//   )
// );

// export default useAuthStore;

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
        }),

      setCooperativeName: (name: string) => set({ cooperativeName: name }),
      setCoopUUID: (uuid: string) => set({ coopUUID: uuid }),
      setUniqueId: (uniqueId: string) => set({ coopUniqueId: uniqueId }),
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
