const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

// Registro de usuario
router.post('/register', register);

// Inicio de sesión
router.post('/login', login);

module.exports = router;
