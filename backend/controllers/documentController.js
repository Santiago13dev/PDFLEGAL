const Document = require('../models/Document');
const Template = require('../models/Template');
const { replacePlaceholders } = require('../utils/helpers');

/**
 * Obtener todos los documentos del usuario autenticado. Los administradores pueden ver todos los documentos.
 * @route GET /api/documents
 */
const getDocuments = async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { user: req.user._id };
    const documents = await Document.find(filter)
      .populate('template', 'title')
      .populate('user', 'name email');
    return res.json(documents);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener documentos', error: error.message });
  }
};

/**
 * Crear un nuevo documento a partir de una plantilla. Genera el HTML con los datos proporcionados.
 * @route POST /api/documents
 */
const createDocument = async (req, res) => {
  const { templateId, data } = req.body;
  if (!templateId || !data) {
    return res.status(400).json({ message: 'Se requiere templateId y datos' });
  }
  try {
    const template = await Template.findById(templateId);
    if (!template) {
      return res.status(404).json({ message: 'Plantilla no encontrada' });
    }
    const html = replacePlaceholders(template.content, data);
    const document = await Document.create({
      user: req.user._id,
      template: templateId,
      data,
      generatedHtml: html,
    });
    return res.status(201).json(document);
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear documento', error: error.message });
  }
};

/**
 * Obtener un documento específico por su ID.
 * @route GET /api/documents/:id
 */
const getDocument = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Document.findById(id)
      .populate('template', 'title')
      .populate('user', 'name email');
    if (!doc) {
      return res.status(404).json({ message: 'Documento no encontrado' });
    }
    return res.json(doc);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener documento', error: error.message });
  }
};

module.exports = {
  getDocuments,
  createDocument,
  getDocument,
};
