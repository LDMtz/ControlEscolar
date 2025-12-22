import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

// Crear instancia de Axios
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de Request - Antes de enviar cada solic.
axiosInstance.interceptors.request.use(
  //Funcion de exito - Todo bien antes de enviar la solic.
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  //Funcion de error - Error al preparar la solic.
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Interceptor de Response - Despues de la respuesta.
axiosInstance.interceptors.response.use(
  //Funcion de exito - Todo bien al recibir la respuesta
  (response) => response,

  //Funcion de error - Si la respuesta es un error
  (error: AxiosError) => {
    // Si el token expiró o es inválido (401)
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    // Si no tiene permisos (403)
    if (error.response?.status === 403) {
      console.error('No tienes permisos para esta acción');
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
