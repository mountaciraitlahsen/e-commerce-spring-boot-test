import { useState } from 'react';
import { resetPassword as passwordResetRequest } from '../services/passwordResetService';

export const usePasswordReset = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const passwordReset = async (token, newPassword) => {
    setLoading(true);
    setError(null);
    try {
      const data = await passwordResetRequest(token, newPassword);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { passwordReset, loading, error, setError};
};