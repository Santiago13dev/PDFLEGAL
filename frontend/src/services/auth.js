import api from './api';

/**
 * Registro de nuevo usuario.
 * @param {{name: string, email: string, password: string}} payload
 */
export const registerUser = async (payload) => {
  const response = await api.post('/auth/register', payload);
  return response.data;
};

/**
 * Inicio de sesión del usuario.
 * @param {{email: string, password: string}} payload
 */
export const loginUser = async (payload) => {
  const response = await api.post('/auth/login', payload);
  return response.data;
};
