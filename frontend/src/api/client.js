import axios from "axios";

const RAW  = import.meta.env.VITE_API_URL || "http://localhost:4000";
const BASE = RAW.replace(/\/+$/,""); // quita "/" finales

console.log('VITE_API_URL =', import.meta.env.VITE_API_URL); // ← quítalo luego

export const API = axios.create({
  baseURL: `${BASE}/api`,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use(cfg => {
  const t = localStorage.getItem('pdflegal_token');
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});
