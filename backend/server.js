const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Cargar variables de entorno
dotenv.config();

// Inicializar app
const app = express();

// Middlewares generales
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Conexión a la base de datos
connectDB(process.env.MONGO_URI);

// Rutas
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de PDFLEGAL');
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/templates', require('./routes/templates'));
app.use('/api/documents', require('./routes/documents'));

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});

// Levantar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
