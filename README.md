# PDFLEGAL – Asistente Legal Ciudadano

PDFLEGAL es una plataforma web que ayuda a los ciudadanos a generar documentos legales comunes (contratos, reclamos, cartas, poderes, etc.) de manera sencilla mediante formularios guiados. Este proyecto está construido **100 % con JavaScript** tanto en el frontend como en el backend y utiliza una arquitectura moderna y organizada.

## 📦 Estructura del proyecto

La aplicación se divide en dos partes principales: **frontend** y **backend**.

```
pdflegal/
│
├── backend/      # API Node.js + Express
├── frontend/     # Aplicación React (Vite)
├── .gitignore
└── README.md
```

### Frontend

La carpeta `frontend/` contiene una aplicación React creada con Vite. Algunas de las librerías y herramientas clave son:

- **React**: biblioteca para construir la interfaz de usuario.
- **TailwindCSS**: framework de utilidades para estilos.
- **React Hook Form** y **Zod**: manejo y validación de formularios.
- **React Router**: navegación de una sola página (SPA).
- **Context API**: manejo de estado global de usuario y formularios.
- **html2pdf.js**: generación de documentos PDF en el navegador.

Para iniciar el frontend en modo de desarrollo:

```bash
cd frontend
npm install
npm run dev
```

El servidor de desarrollo se iniciará, por defecto, en `http://localhost:5173`. La aplicación consume la API del backend para autenticación, gestión de plantillas y generación de documentos.

### Backend

La carpeta `backend/` contiene una API REST construida con Node.js y Express. Las dependencias principales incluyen:

- **Express**: framework web minimalista para Node.js.
- **MongoDB (Mongoose)**: base de datos NoSQL y ODM para modelar datos.
- **JSON Web Tokens (JWT)**: autenticación basada en tokens.
- **Bcrypt**: hashing seguro de contraseñas.
- **Cors** y **Helmet**: configuraciones básicas de seguridad.

Para levantar el backend en modo de desarrollo:

```bash
cd backend
npm install
cp .env.example .env # y completa las variables según tu entorno
npm run dev
```

El servidor Express escuchará por defecto en `http://localhost:3000`. La API proporciona las siguientes rutas principales:

- `POST /api/auth/register` – Crear un usuario.
- `POST /api/auth/login` – Autenticar usuario y recibir un token JWT.
- `GET /api/templates` – Listar plantillas disponibles.
- `POST /api/templates` – Crear nueva plantilla (requiere rol de administrador).
- `GET /api/documents` – Obtener historial de documentos creados por el usuario.
- `POST /api/documents` – Generar un nuevo documento a partir de una plantilla.

## 📝 Funcionalidades básicas

1. **Registro / inicio de sesión**: Los usuarios pueden crear una cuenta y acceder a la aplicación mediante autenticación JWT.
2. **Selección de trámite legal**: El dashboard permite elegir entre diferentes plantillas (contratos, cartas, reclamos, etc.).
3. **Rellenado de formulario guiado**: Cada plantilla cuenta con un formulario paso a paso. Los campos se validan con Zod para asegurar la integridad de los datos.
4. **Vista previa y exportación a PDF**: Tras rellenar el formulario, el usuario puede previsualizar el documento y exportarlo como PDF gracias a `html2pdf.js`.
5. **Historial de documentos**: Cada usuario puede ver su historial de documentos generados.
6. **Panel de administración**: Permite a los administradores gestionar plantillas y usuarios.

## 🚀 Despliegue

El proyecto está pensado para funcionar en servicios gratuitos como **Vercel** (frontend), **Render/Railway** (backend) y **MongoDB Atlas** (base de datos). Se incluye un ejemplo de archivo `.env.example` para configurar las variables necesarias.

## 📄 Licencia

Este proyecto se distribuye bajo la MIT License. ¡Siéntete libre de usar y extender PDFLEGAL para tus propios proyectos!
