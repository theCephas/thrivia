import { useCallback, useEffect, useState } from "react";
import { useAxiosInstance } from "./axiosInstance";
import useAuthStore from "../store";

const useFetchWallets = (roles: string) => {
  const [wallets, setWallets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const axiosInstance = useAxiosInstance();
  const { cooperativeUUID, setWalletUuid } = useAuthStore();

  const fetchWallets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
      if (roles === "manager") {
        response = await axiosInstance.get(
          `/cooperatives/${cooperativeUUID}/wallets`
        );
      } else {
        response = await axiosInstance.get(
          `/users/cooperative/${cooperativeUUID}/wallets`
        );
      }

      setWallets(response.data);
      setWalletUuid(response.data.uuid);
    } catch (err) {
      setError("Failed to load cooperatives");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [cooperativeUUID, roles, axiosInstance, setWalletUuid]);

  useEffect(() => {
    if (cooperativeUUID) {
      fetchWallets();
    }
  }, [fetchWallets, cooperativeUUID]);

  return { loading, wallets, error };
};

export default useFetchWallets;
