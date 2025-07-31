const express = require('express');
const { getDocuments, createDocument, getDocument } = require('../controllers/documentController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// Obtener historial de documentos
router.get('/', protect, getDocuments);

// Obtener un documento específico
router.get('/:id', protect, getDocument);

// Generar nuevo documento
router.post('/', protect, createDocument);

module.exports = router;
