import { useCallback, useEffect, useState } from "react";
import { useAxiosInstance } from "./axiosInstance";

const useFetchCoop = () => {
  const [cooperatives, setCooperatives] = useState<any[]>([]);
  const [loadingCoop, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const axiosInstance = useAxiosInstance();

  const fetchCooperatives = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/users/cooperatives");

      setCooperatives(response.data);
    } catch (err) {
      setError("Failed to load cooperatives");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchCooperatives();
  }, []);
  return { loadingCoop, cooperatives, error };
};

export default useFetchCoop;
