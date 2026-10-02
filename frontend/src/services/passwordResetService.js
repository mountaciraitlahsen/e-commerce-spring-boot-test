import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/auth/reset-password',
});

export const reset = async (email) => {
  const { data } = await api.post('', { email});
  return data;
};