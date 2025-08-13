//conexión a mongodb
import mongoose from 'mongoose'

const auditSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    templateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Template', default: null },
    documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', default: null },
    event: {
      type: String,
      enum: [
        'AUTH_LOGIN',
        'TEMPLATE_CREATE',
        'TEMPLATE_UPDATE',
        'TEMPLATE_DELETE',
        'DOCUMENT_CREATE',
        'DOCUMENT_EXPORT',
        'PREVIEW_VIEW'
      ],
      required: true
    },
    meta: { type: Object, default: {} }
  },
  { timestamps: true }
)

auditSchema.index({ event: 1, templateId: 1, createdAt: -1 })
auditSchema.index({ userId: 1, createdAt: -1 })

export default mongoose.model('AuditLog', auditSchema)
