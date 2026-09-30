import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/auth/login',
});

export const login = async (email, password) => {
  const { data } = await api.post('', { email, password });
  return data;
};