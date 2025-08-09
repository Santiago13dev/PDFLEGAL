// backend/models/Norma.js
import mongoose from 'mongoose'

const relacionSchema = new mongoose.Schema({
  tipo: { type: String, enum: ['DEROGA', 'MODIFICA', 'REGLAMENTA', 'COMPILA'], required: true },
  ref:  { type: String, required: true } // ej: "Ley 1480 de 2011"
}, { _id: false })

const normaSchema = new mongoose.Schema({
  fuente: { type: String, required: true },             // 'Diario Oficial', 'SUIN', 'Corte Const.', etc.
  tipo:   { type: String, required: true },             // 'Ley', 'Decreto', 'Resolución', 'Sentencia'
  numero: { type: String, required: true },             // '1480', '1074', 'T-123'
  anio:   { type: Number, required: true },             // 2011
  fechaExpedicion: { type: Date },
  fechaPublicacion: { type: Date },
  entidad: { type: String },                             // 'Congreso', 'MinCIT', 'Corte Constitucional'
  diarioOficial: { type: String },                       // número DO, si aplica
  estado: { type: String, enum: ['VIGENTE','DEROGADA','PARCIALMENTE_VIGENTE','NO_APLICA'], default: 'VIGENTE' },

  titulo: { type: String, required: true },
  sumario: { type: String, default: '' },
  temas: [{ type: String }],

  // Contenido normalizado (si se permite almacenar). Siempre mantener:
  html: { type: String, default: '' },
  pdfUrl: { type: String, default: '' },
  sourceUrl: { type: String, required: true },          // enlace a la fuente oficial

  relaciones: [relacionSchema],                          // enlaces a otras normas
  hashContenido: { type: String },                       // para deduplicación
}, { timestamps: true })

normaSchema.index({ titulo: 'text', sumario: 'text', temas: 'text' })
export default mongoose.model('Norma', normaSchema)
