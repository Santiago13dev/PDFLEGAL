//utilidades de respuestas de la pagina como ok y fail
export function ok(res, data = {}, status = 200) {
  return res.status(status).json({ ok: true, ...data });
}
export function fail(res, message = "Error", status = 400) {
  return res.status(status).json({ ok: false, message });
}
