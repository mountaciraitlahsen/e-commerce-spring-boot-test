import { useState } from 'react';
import { reset as passwordResetRequest } from '../services/passwordResetService';

export const usePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const passwordReset = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const data = await passwordResetRequest(email);
      localStorage.setItem('token', data.token);
      console.log(data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { passwordReset, loading, error };
};