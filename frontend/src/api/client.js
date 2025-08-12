import axios from "axios";

// frontend/.env -> VITE_API_URL=http://localhost:4000
const RAW  = import.meta.env.VITE_API_URL || "http://localhost:4000";
const BASE = RAW.replace(/\/+$/, ""); // quita "/" finales

export const API = axios.create({
  baseURL: `${BASE}/api`,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Bearer desde localStorage (si lo usas)
API.interceptors.request.use((cfg) => {
  const t = localStorage.getItem("pdflegal_token");
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});
