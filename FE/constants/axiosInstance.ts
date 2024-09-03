import useAuthStore from "@/store";
import axios from "axios";

const useAuthToken = () => {
  const token = useAuthStore((state) => state.token);
  return token;
};

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://thrivia.homease.ng",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const useAxiosInstance = () => {
  const token = useAuthToken();
  axiosInstance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${
          token.manager ? token.manager : token.member
        }`;
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
