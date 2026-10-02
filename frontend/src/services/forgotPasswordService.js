import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/auth/forgot-password',
});

export const forgot = async (email) => {
  const { data } = await api.post('', { email});
  return data;
};