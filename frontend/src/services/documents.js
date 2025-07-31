import api from './api';

/**
 * Obtiene el historial de documentos del usuario autenticado (o todos si es admin).
 */
export const fetchDocuments = async () => {
  const { data } = await api.get('/documents');
  return data;
};

/**
 * Crea un nuevo documento a partir de una plantilla.
 * @param {{templateId: string, data: Object}} payload
 */
export const createDocument = async (payload) => {
  const { data } = await api.post('/documents', payload);
  return data;
};

/**
 * Obtiene un documento específico por su ID.
 * @param {string} id
 */
export const fetchDocumentById = async (id) => {
  const { data } = await api.get(`/documents/${id}`);
  return data;
};
