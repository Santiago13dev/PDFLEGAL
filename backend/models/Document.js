const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template',
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    generatedHtml: {
      type: String,
      required: true,
    },
    pdfUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Document', DocumentSchema);
