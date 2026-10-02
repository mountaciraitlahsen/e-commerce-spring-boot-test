import { useState } from 'react';
import { forgot as forgotPasswordRequest } from '../services/forgotPasswordService';

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const forgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const data = await forgotPasswordRequest(email);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { forgotPassword, loading, error };
};