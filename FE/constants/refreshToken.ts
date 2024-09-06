// import useAuthStore from "@/store";
// import { useAxiosInstance } from "@/constants/axiosInstance";

// export const refreshAuthToken = async () => {
//   const axiosInstance = useAxiosInstance();
//   try {
//     const response = await axiosInstance.post("/auth/refresh");
//     const { newToken, expiresIn } = response.data;
//     useAuthStore.getState().refreshToken(newToken, expiresIn);
//   } catch (error) {
//     console.error("Failed to refresh token:", error);
//     useAuthStore.getState().logout();
//     throw error;
//   }
// };
