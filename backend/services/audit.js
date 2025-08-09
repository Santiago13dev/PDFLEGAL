import AuditLog from '../models/AuditLog.js'

/**
 * Registra un evento de auditoría sin romper el flujo principal si falla.
 * @param {Object} params
 * @param {string|null} params.userId
 * @param {string|null} params.templateId
 * @param {string|null} params.documentId
 * @param {string} params.event
 * @param {Object} [params.meta]
 */
export async function logEvent({
  userId = null,
  templateId = null,
  documentId = null,
  event,
  meta = {}
}) {
  try {
    await AuditLog.create({ userId, templateId, documentId, event, meta })
  } catch (e) {
    console.error('Audit log error:', e.message)
  }
}
