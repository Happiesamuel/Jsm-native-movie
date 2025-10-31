import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetchFunction();
      setData(res);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error instanceof Error ? error : new Error("An error occured"));
    } finally {
      setLoading(false);
    }
  };
  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  useEffect(
    function () {
      if (autoFetch) {
        fetchData();
      }
    },
    [autoFetch]
  );
  return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;
