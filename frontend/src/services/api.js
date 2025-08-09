//funciones de api y peticiones HTTP para la aplicación PDFLegal
import axios from "axios";
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
});
API.interceptors.request.use((cfg) => {
  const t = localStorage.getItem("pdflegal_token");
  if (t) cfg.headers.Authorization = "Bearer " + t;
  return cfg;
});
export const AuthAPI = {
  async login(email, password) {
    const { data } = await API.post("/auth/login", { email, password });
    return data;
  },
  async register(name, email, password) {
    const { data } = await API.post("/auth/register", {
      name,
      email,
      password,
    });
    return data;
  },
};
export const TemplateAPI = {
  async list() {
    const { data } = await API.get("/templates");
    return data;
  },
  async create(payload) {
    const { data } = await API.post("/templates", payload);
    return data;
  },
};
export const DocumentAPI = {
  async create(templateId, formData) {
    const { data } = await API.post("/documents", {
      templateId,
      data: formData,
    });
    return data;
  },
  async list() {
    const { data } = await API.get("/documents");
    return data;
  },
};
