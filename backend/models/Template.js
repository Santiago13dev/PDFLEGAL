const mongoose = require('mongoose');

const FieldSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['text', 'number', 'date', 'textarea'],
      default: 'text',
    },
    required: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);

const TemplateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'El título es obligatorio'],
    },
    description: {
      type: String,
    },
    fields: [FieldSchema],
    content: {
      type: String,
      required: [true, 'El contenido de la plantilla es obligatorio'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Template', TemplateSchema);
