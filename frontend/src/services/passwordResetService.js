import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/auth/reset-password',
});

export const resetPassword = async (token, newPassword) => {
  const { data } = await api.post('', {"token": token,
    "newPassword": newPassword});
  return data;
};