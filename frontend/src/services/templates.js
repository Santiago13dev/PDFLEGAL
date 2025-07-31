import api from './api';

/**
 * Obtiene la lista de todas las plantillas disponibles.
 */
export const fetchTemplates = async () => {
  const { data } = await api.get('/templates');
  return data;
};

/**
 * Obtiene una plantilla específica por ID.
 * @param {string} id
 */
export const fetchTemplateById = async (id) => {
  const { data } = await api.get(`/templates/${id}`);
  return data;
};

/**
 * Crea una nueva plantilla (requiere ser administrador).
 * @param {{title: string, description: string, fields: Array, content: string}} payload
 */
export const createTemplate = async (payload) => {
  const { data } = await api.post('/templates', payload);
  return data;
};

/**
 * Actualiza una plantilla existente.
 * @param {string} id
 * @param {Object} payload
 */
export const updateTemplate = async (id, payload) => {
  const { data } = await api.put(`/templates/${id}`, payload);
  return data;
};

/**
 * Elimina una plantilla existente.
 * @param {string} id
 */
export const deleteTemplate = async (id) => {
  const { data } = await api.delete(`/templates/${id}`);
  return data;
};
