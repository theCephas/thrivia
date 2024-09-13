import { useCallback, useEffect, useState } from "react";
import { useAxiosInstance } from "./axiosInstance";
import useAuthStore from "@/store";

const useFetchWallets = () => {
  const [wallets, setWallets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const axiosInstance = useAxiosInstance();
  const { coopUuid, setWalletUuid } = useAuthStore();

  const fetchWallets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(
        `/users/cooperative/${coopUuid}/wallets`
      );

      setWallets(response.data);

      setWalletUuid(response.data.uuid);
    } catch (err) {
      setError("Failed to load cooperatives");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchWallets();
  }, []);
  return { loading, wallets, error };
};

export default useFetchWallets;
