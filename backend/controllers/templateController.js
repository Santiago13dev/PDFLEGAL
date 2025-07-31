const Template = require('../models/Template');

/**
 * Obtener todas las plantillas disponibles.
 * @route GET /api/templates
 */
const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find().select('-content'); // no enviar contenido completo en lista
    return res.json(templates);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener plantillas', error: error.message });
  }
};

/**
 * Obtener una plantilla por su ID.
 * @route GET /api/templates/:id
 */
const getTemplate = async (req, res) => {
  const { id } = req.params;
  try {
    const template = await Template.findById(id);
    if (!template) {
      return res.status(404).json({ message: 'Plantilla no encontrada' });
    }
    return res.json(template);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener plantilla', error: error.message });
  }
};

/**
 * Crear una nueva plantilla (solo para administradores).
 * @route POST /api/templates
 */
const createTemplate = async (req, res) => {
  const { title, description, fields, content } = req.body;
  if (!title || !fields || !content) {
    return res.status(400).json({ message: 'Título, campos y contenido son obligatorios' });
  }
  try {
    const template = await Template.create({
      title,
      description,
      fields,
      content,
      createdBy: req.user._id,
    });
    return res.status(201).json(template);
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear plantilla', error: error.message });
  }
};

/**
 * Actualizar una plantilla existente (solo administradores).
 * @route PUT /api/templates/:id
 */
const updateTemplate = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Template.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: 'Plantilla no encontrada' });
    }
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar plantilla', error: error.message });
  }
};

/**
 * Eliminar una plantilla existente (solo administradores).
 * @route DELETE /api/templates/:id
 */
const deleteTemplate = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Template.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Plantilla no encontrada' });
    }
    return res.json({ message: 'Plantilla eliminada' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar plantilla', error: error.message });
  }
};

module.exports = {
  getTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
};
