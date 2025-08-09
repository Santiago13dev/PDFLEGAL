# Flujos Funcionales

## 1) Autenticación
1. Usuario ingresa email/contraseña.
2. Frontend → `POST /api/auth/login`.
3. Backend valida credenciales, retorna `{ token, user }`.
4. Frontend guarda `token` y `user` en `localStorage`.

## 2) Subir documento y crear plantilla
1. Usuario sube `.txt/.html` o pega contenido.
2. Detectar `{{placeholders}}` automáticamente o marcar selección como campo.
3. Guardar plantilla → `POST /api/templates` (Auth).
4. Redirección a `Form`.

Secuencia:
Frontend(Upload) → Backend(templates.create) → Mongo(Template) → Frontend(Form)

## 3) Form → Render → PDF
1. Completar campos del Form (inputs no controlados).
2. Renderizar HTML reemplazando `{{llaves}}`.
3. Crear documento (historial) → `POST /api/documents` (Auth).
4. Ir a `Preview` y exportar a PDF (html2pdf.js).

Secuencia:
Frontend(Form) → Backend(documents.create) → Mongo(Document) → Frontend(Preview) → PDF
