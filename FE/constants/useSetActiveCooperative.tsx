import { useEffect } from "react";
import { useAxiosInstance } from "@/constants/axiosInstance";
import useAuthStore from "@/store";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

const useSetActiveCoop = () => {
  const axiosInstance = useAxiosInstance();
  const router = useRouter();
  const { token, logout, setActiveCooperative, user } = useAuthStore();

  const setActiveCooperativeAPI = async (coopDetails: any) => {
    try {
      await axiosInstance.post("/users/set-active-cooperative", {
        coopUuid: coopDetails.uuid,
      });
      setActiveCooperative(coopDetails.uuid, coopDetails.name);

      router.replace(`/(root)/(manager-tabs)/${coopDetails.uuid}`);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error setting active cooperative",
      });
    }
  };

  useEffect(() => {
    // Optionally, set the active cooperative on user load (e.g., after login)
    if (user && user.activeCooperative) {
      setActiveCooperativeAPI(user.activeCooperative);
    } else if (!user) {
      logout();
    }
  }, [user, axiosInstance, router, setActiveCooperative]);

  // Return the API function to be used externally
  return { setActiveCooperativeAPI };
};

export default useSetActiveCoop;
