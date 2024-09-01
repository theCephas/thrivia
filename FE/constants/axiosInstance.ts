import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://thrivia.homease.ng",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = "your-token-here";
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

export default axiosInstance;
