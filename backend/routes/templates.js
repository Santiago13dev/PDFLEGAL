const express = require('express');
const {
  getTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
} = require('../controllers/templateController');
const { protect, admin } = require('../middlewares/auth');

const router = express.Router();

// Obtener todas las plantillas
router.get('/', protect, getTemplates);

// Crear plantilla (admin)
router.post('/', protect, admin, createTemplate);

// Obtener una plantilla por ID
router.get('/:id', protect, getTemplate);

// Actualizar plantilla (admin)
router.put('/:id', protect, admin, updateTemplate);

// Eliminar plantilla (admin)
router.delete('/:id', protect, admin, deleteTemplate);

module.exports = router;
