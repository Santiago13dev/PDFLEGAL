const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Genera un token JWT a partir del id del usuario.
 * @param {string} userId
 * @returns {string}
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

/**
 * Registro de usuario. Crea un nuevo usuario con los datos proporcionados.
 * @route POST /api/auth/register
 */
const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }
    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);
    const { password: _, ...userData } = user.toObject();
    return res.status(201).json({ user: userData, token });
  } catch (error) {
    return res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
};

/**
 * Inicio de sesión. Verifica credenciales y devuelve token.
 * @route POST /api/auth/login
 */
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }
    const token = generateToken(user._id);
    const { password: _, ...userData } = user.toObject();
    return res.json({ user: userData, token });
  } catch (error) {
    return res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

module.exports = {
  register,
  login,
};
