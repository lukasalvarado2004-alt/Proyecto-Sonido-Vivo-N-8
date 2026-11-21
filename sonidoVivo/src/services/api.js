import axios from 'axios';

// En Vite, VITE_API_URL es accesible desde el navegador; no colocar secretos aquí.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://3.231.52.35:8081/api/v1',
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('sv_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
