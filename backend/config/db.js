const mongoose = require('mongoose');

/**
 * Conecta la aplicación a MongoDB usando la URI proporcionada.
 * @param {string} uri Cadena de conexión a MongoDB
 * @returns {Promise<void>}
 */
async function connectDB(uri) {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
