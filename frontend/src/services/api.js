import axios from 'axios';

// Base URL de la API. Ajusta según tu entorno (por ejemplo, variables de entorno o .env).
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Crea una instancia de Axios configurada con la base de la API y un interceptor
 * para incluir el token de autorización si existe. Esta instancia se utiliza en
 * los servicios para evitar repetir configuración.
 */
const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para agregar token JWT en las peticiones si está disponible
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
