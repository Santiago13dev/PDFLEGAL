
# PDFLEGAL — Asistente Legal Ciudadano (100% JavaScript)

 Plataforma web para **crear, editar y exportar documentos legales** a partir de plantillas con `{{placeholders}}`.  
 Frontend: **React + Vite + Tailwind** · Backend: **Node.js + Express + MongoDB** · Auth: **JWT** · PDF: **html2pdf.js**.

---

## ✨ Características (MVP y más)
- **Autenticación** (registro/login) con JWT.
- **Gestión de plantillas** (propias y globales).
- **Subida de documentos** `.txt/.html` → conversión automática a **plantilla editable**.
- **Detección de placeholders** `{{campo}}` y **marcado de selección** para crear campos.
- **Formulario dinámico** (inputs no controlados → foco estable).
- **Vista previa** del documento renderizado y **exportación a PDF**.
- **Historial** de documentos generados por usuario.
- **UI de alto contraste** (accesible) y diseño limpio.
- **Búsqueda demo** de normativa colombiana (mock, lista para conectar a índice real).

---

## 🧱 Arquitectura
**Monorepo** con dos paquetes:

```
/frontend
/backend
```

- **Frontend**: SPA con React Router, estado con Context (Auth), llamadas API con Axios.
- **Backend**: API REST Express; modelos con Mongoose; middlewares de seguridad (Helmet, CORS); logging (morgan).
- **PDF**: html2pdf.js (html2canvas + jsPDF).
- **Calidad**: ESLint + Prettier; GitHub Actions (lint); Husky + lint-staged (opcional).

---

## 🗂️ Estructura de carpetas
```
/frontend
  /src
    /assets            # Imágenes, logos
    /components        # Navbar, Stepper
    /pages             # Home, Login, Register, Dashboard, Upload, Form, Preview, Search
    /routes            # ProtectedRoute
    /services          # api.js (Axios + interceptors)
    /store             # Contexto de Auth
    /utils             # placeholder: detectar/sustituir
  index.html
  vite.config.js
  tailwind.config.js
  postcss.config.js
  .eslintrc.cjs
  .prettierrc

/backend
  /config              # db.js (conexión Mongo)
  /controllers         # auth, template, document
  /middlewares         # requireAuth (JWT)
  /models              # User, Template, Document
  /routes              # /auth, /templates, /documents
  /utils               # helpers de respuesta
  server.js
  .env.example
  .eslintrc.cjs
  .prettierrc
```

---

## 🔧 Requisitos
- Node.js 18+
- npm 9+
- MongoDB Atlas (o local)
- Git (opcional)

---

## ⚙️ Variables de entorno

**Backend (`/backend/.env`)**
```
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/pdflegal            # o tu cadena Atlas
JWT_SECRET=super_secret_key
CLIENT_URL=http://localhost:5173
```

**Frontend (`/frontend/.env.local`)**
```
VITE_API_URL=http://localhost:4000/api
```

---

## ▶️ Ejecución en local

### 1) Backend
```bash
cd backend
cp .env.example .env    # edita valores si hace falta
npm install
npm run dev             # http://localhost:4000
```

### 2) Frontend
```bash
cd frontend
echo "VITE_API_URL=http://localhost:4000/api" > .env.local
npm install
npm run dev             # http://localhost:5173
```

---

## 🚀 Despliegue (gratuito)
- **Frontend**: Vercel → framework Vite (importa repo, setea `VITE_API_URL` con la URL pública del backend).
- **Backend**: Render o Railway → Node server; configura variables (`PORT`, `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`).  
- **Base de datos**: MongoDB Atlas (free tier).

> Recuerda permitir el **CORS** del dominio del frontend en el backend (variable `CLIENT_URL`).

---

## 🔐 Seguridad básica
- JWT con expiración de 7 días.
- Contraseñas con **bcrypt**.
- **Helmet** para headers, **CORS** configurado, **morgan** para logs.
- **No** subir `.env` al repo (usa `.env.example` y `.gitignore`).

---

## 🧩 Flujo funcional (de usuario)
1. Registro o inicio de sesión.
2. **Upload**: sube `.txt/.html` o pega texto → se detectan `{{placeholders}}` automáticamente.
3. (Opcional) Marca una selección para crear un `{{campo}}` si no existe.
4. Guarda como **plantilla** → pasa al **Form** dinámico.
5. Completa datos → **Preview** renderizado.
6. Exporta a **PDF** (html2pdf.js).

**Notas de UX**
- Inputs del form son **no controlados** (usamos `defaultValue`), con lo que **no se pierde el foco** al escribir.
- Sustitución de placeholders con **escape de regex** para evitar reemplazos indeseados.

---

## 🗃️ Modelos (Mongoose)

### `User`
```js
{ name: String, email: String, passwordHash: String }
```

### `Template`
```js
{
  userId: ObjectId,
  title: String,
  description: String,
  fields: [{ name, label, type, required }],
  content: String // HTML o texto con {{placeholders}}
}
```

### `Document`
```js
{ userId: ObjectId, templateId: ObjectId, data: Object, html: String }
```

---

## 🌐 Endpoints principales

### Auth (`/api/auth`)
```http
POST /register      { name, email, password }
POST /login         { email, password }  -> { token, user }
```

### Plantillas (`/api/templates`) — requiere `Authorization: Bearer <token>`
```http
GET    /            -> { items }
POST   /            { title, description, fields, content } -> { item }
PUT    /:id
DELETE /:id
```

### Documentos (`/api/documents`) — requiere `Authorization`
```http
GET  /              -> { items }
POST /              { templateId, data } -> { item }
```

---

## 🧪 Calidad y CI
- **ESLint + Prettier** en frontend y backend.
- **GitHub Actions**: job de lint en cada push/PR.
- **Husky + lint-staged** (opcional) para formatear en pre-commit.

---

## 🎨 UI / Accesibilidad
- Paleta alto contraste: **slate + blue** (texto `slate-900/700`, botones `blue-600` con hover `blue-500`, bordes `slate-200/300`).
- Focus visibles: `focus:ring-blue-600`.
- Tarjetas claras con bordes ligeros; nada de overlays que opaquen el copy.
- Tipografía legible y espaciados cómodos.

---

## 📥 Subida de documentos y placeholders
- Acepta `.txt` y `.html` (puedes ampliar el `accept`).
- Detector de `{{llaves}}` recorre el texto y **normaliza** nombres (`[a-zA-Z0-9_]`).
- Botón **“Marcar selección como campo”**: reemplaza el texto seleccionado por `{{nombre}}` y agrega el campo al esquema de la plantilla.
- Si no hay campos detectados y el usuario intenta guardar, se solicita al menos uno.

---

## 🔍 Búsqueda de normativa (Roadmap)
- La página **Search** es un mock listo para conectar a un **índice real** (ej. IRES, datos abiertos, o tu propio crawler + Elastic/Lite index).
- Integración sugerida:
  - Job de ingesta → normaliza título, tipo (Ley/Decreto/Sentencia), fecha, enlace fuente, resumen corto.
  - Endpoint `/api/search?q=` con ranking simple (BM25) o Elastic.
  - UI ya lista para mostrar resultados y enlazar fuentes.

---

## 🧯 Troubleshooting
- **No compila el frontend**: revisa versión de Node (18+).  
- **CORS bloqueado**: confirma `CLIENT_URL` en backend y `VITE_API_URL` en frontend.  
- **No conecta a Mongo**: valida `MONGODB_URI` (Atlas: IP allowlist/Network Access).  
- **PDF vacío**: asegúrate de que `state.html` llega a Preview antes de exportar.  
- **Foco en inputs**: el form usa `defaultValue`; si lo cambias a `value`, controla correctamente el estado.  

---

## 🧭 Guía rápida Git (actualizar `main` con tu rama)
> Si ya subiste `feat/pdflegal` y quieres que **main = feat/pdflegal**:

### Opción rápida (reescribe historial)
```bash
git checkout main
git pull origin main
git tag backup/main-antes-pdflegal && git push origin backup/main-antes-pdflegal
git reset --hard origin/feat/pdflegal
git push --force-with-lease origin main
```

### Opción sin forzar (merge y cleanup)
```bash
git checkout main
git pull --rebase origin main
git merge --no-ff origin/feat/pdflegal
# borra las carpetas viejas que sobren
git rm -r ruta/vieja1 ruta/vieja2
git commit -m "chore: remove legacy project after merge"
git push origin main
```

---

## 📌 Convenciones
- Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`.
- Ramas: `feat/xxx`, `fix/xxx`, `chore/xxx`.
- Pull Requests: descripción breve + checklist de pruebas manuales.

---

## 📄 Licencia
MIT (o la que prefieras).

---

## 🤝 Contribuir
1. Crea una rama desde `main`.
2. Cambios + tests manuales.
3. Lint pasa en local (`npm run lint` en cada paquete).
4. PR y revisión.

---

## 🧭 Roadmap sugerido
- Editor WYSIWYG con placeholders (contenteditable + toolbar).
- Firmas y sellos (canvas/imagen).
- Versionado de plantillas y control de acceso por rol (admin).
- Auditoría y estadísticas (uso por plantilla).
- Índice real para normativa colombiana (con fuente oficial).
- Exportación adicional a DOCX (con `docxtemplater` en Node).
