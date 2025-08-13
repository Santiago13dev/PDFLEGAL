// generar y guardar documentos dentro de la base de datos
import Document from "../models/Document.js";
import Template from "../models/Template.js";
import { ok, fail } from "../utils/response.js";
import { logEvent } from '../services/audit.js';

function esc(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function replacePh(tpl, data) {
  return Object.keys(data || {}).reduce(
    (acc, k) =>
      acc.replace(new RegExp(`{{\\s*${esc(k)}\\s*}}`, "g"), data[k] ?? ""),
    tpl,
  );
}
export async function create(req, res) {
  try {
    const { templateId, data } = req.body;
    const tpl = await Template.findById(templateId);
    if (!tpl) return fail(res, "Plantilla no existe", 404);
    const html = replacePh(tpl.content, data || {});
    const doc = await Document.create({
      userId: req.user.id,
      templateId,
      data,
      html,
    });
    await logEvent({
      userId: req.user.id,
      templateId: templateId,
      documentId: doc._id,
      event: 'DOCUMENT_CREATE'
    });
    return ok(res, { item: doc }, 201);
  } catch (e) {
    return fail(res, e.message || "Error creando documento", 500);
  }
}
export async function list(req, res) {
  const items = await Document.find({ userId: req.user.id }).sort({
    createdAt: -1,
  });
  return ok(res, { items });
}
