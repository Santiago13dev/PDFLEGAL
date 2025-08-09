import Template from "../models/Template.js";
import { ok, fail } from "../utils/response.js";
export async function list(req, res) {
  const items = await Template.find({
    $or: [{ userId: null }, { userId: req.user?.id }],
  }).sort({ createdAt: -1 });
  return ok(res, { items });
}
export async function create(req, res) {
  try {
    const { title, description, fields, content } = req.body;
    if (!title || !content) return fail(res, "Título y contenido obligatorios");
    const item = await Template.create({
      userId: req.user.id,
      title,
      description,
      fields,
      content,
    });
    return ok(res, { item }, 201);
  } catch (e) {
    return fail(res, e.message || "Error creando plantilla", 500);
  }
}
export async function update(req, res) {
  try {
    const { id } = req.params;
    const { title, description, fields, content } = req.body;
    const item = await Template.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { title, description, fields, content },
      { new: true },
    );
    if (!item) return fail(res, "No encontrado", 404);
    return ok(res, { item });
  } catch (e) {
    return fail(res, e.message || "Error actualizando", 500);
  }
}
export async function remove(req, res) {
  try {
    const { id } = req.params;
    const r = await Template.deleteOne({ _id: id, userId: req.user.id });
    if (!r.deletedCount) return fail(res, "No encontrado", 404);
    return ok(res, {});
  } catch (e) {
    return fail(res, e.message || "Error eliminando", 500);
  }
}
