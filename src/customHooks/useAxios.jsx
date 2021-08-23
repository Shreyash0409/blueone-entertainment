import { useState, useCallback, useEffect, useRef } from "react";

//* Custom hook for calling all the apis calling function provided by the components.
const useAxios = () => {
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(true);

  const fetchData = useCallback(
    async (requestFunction, applyData) => {
      setIsLoading(true);
      try {
        const response = await requestFunction();
        if (isMounted.current) {
          applyData(response);
          setFetchError(null);
        }
      } catch (err) {
        if (isMounted.current) {
          setFetchError("Something went wrong.");
        }
      } finally {
        isMounted.current && setIsLoading(false);
      }
    },
    [setIsLoading, setFetchError]
  );

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  return { fetchData, fetchError, isLoading };
};

export default useAxios;
