import { useState } from 'react';

const useApi = (apiFunc) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    try {
      const result = await apiFunc(...args);
      setData(result);
      setError(false);
      return result;
    } catch (err) {
      setError(err.message || 'Unexpected Error!');
      return err;
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, request };
};

export default useApi;