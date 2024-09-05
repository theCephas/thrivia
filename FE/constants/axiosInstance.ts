import axios from "axios";
import useAuthStore from "@/store";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://thrivia.homease.ng",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const useAxiosInstance = () => {
  const token = useAuthStore.getState().token;

  axiosInstance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        const data = error.response.data;
        const message =
          typeof data.message !== "string"
            ? data.message?.join("\n")
            : data.message;
        throw new Error(message);
      }
    }
  );

  return axiosInstance;
};
