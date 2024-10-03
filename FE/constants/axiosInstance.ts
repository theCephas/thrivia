import axios from "axios";
import useAuthStore from "../store";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://thrivia.homease.ng",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
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
        typeof data.message === "string"
          ? data.message
          : Array.isArray(data.message)
          ? data.message.join("\n")
          : "An unexpected error occurred";
      return Promise.reject(new Error(message));
    }

    if (error.code === "ECONNABORTED") {
      return Promise.reject(new Error("Request timed out. Please try again."));
    }

    return Promise.reject(error);
  }
);

export const useAxiosInstance = () => {
  return axiosInstance;
};
