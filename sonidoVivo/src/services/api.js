import axios from 'axios';

function cliente(baseURL) {
  const clienteApi = axios.create({ baseURL, timeout: 10000 });
  clienteApi.interceptors.request.use(config => {
    const token = sessionStorage.getItem('sv_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  return clienteApi;
}

const usuariosURL = import.meta.env.VITE_API_URL || 'http://184.193.137.168:8081/api/v1';
function mismoServidor(puerto) {
  const url = new URL(usuariosURL, window.location.origin);
  url.port = puerto;
  return url.href;
}
export const api = cliente(usuariosURL);
export const productosApi = cliente(import.meta.env.VITE_PRODUCTOS_API_URL || mismoServidor('8082'));
export const pedidosApi = cliente(import.meta.env.VITE_PEDIDOS_API_URL || mismoServidor('8083'));
