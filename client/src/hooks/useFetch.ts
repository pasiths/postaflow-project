import { useState, useEffect } from "react";

const useFetch = <T>(
  fetchFunction: () => Promise<T>
): {
  data: T | null;
  loading: boolean;
} => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchFunction();
        setData(result);
      } catch (err) {
        setData(null);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchFunction]);

  return { data, loading };
};

export default useFetch;
