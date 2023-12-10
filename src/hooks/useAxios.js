import axios from '../lib/axios';
import { useState } from 'react';

const useAxios = (url, method) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();

  const operation = async (body) => {
    setLoading(true);
    setError(null);
    try {
      const result = await axios.request({
        url: url,
        method: method,
        data: body,
      });
      const data = result?.data;
      setData(data);
      return data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { operation, data, error, loading };
};

export default useAxios;
