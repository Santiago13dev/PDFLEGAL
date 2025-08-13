import { createContext, useContext, useState, useEffect } from "react";
import { API as api } from "../api/client.js";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // (opcional) hidrata usuario si ya hay token
  useEffect(() => {
    const t = localStorage.getItem("pdflegal_token");
    // si tienes /api/auth/me podrías llamarlo aquí para traer user
    // por ahora, basta con dejar el token y esperar la primera llamada protegida
  }, []);

  const login = async ({ email, password }) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      // 👇 guarda el token para que el interceptor lo mande en Authorization
      if (data.token) localStorage.setItem("pdflegal_token", data.token);
      setUser(data.user || null);
      return { ok: true, data };
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Credenciales inválidas";
      return { ok: false, message };
    }
  };

  const registerUser = async ({ name, email, password }) => {
    try {
      const { data } = await api.post("/auth/register", { name, email, password });
      if (data.token) localStorage.setItem("pdflegal_token", data.token);
      setUser(data.user || { name, email });
      return { ok: true, data };
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Error de registro";
      return { ok: false, message };
    }
  };

  const logout = async () => {
    try { await api.get("/auth/logout"); } catch {}
    localStorage.removeItem("pdflegal_token");   // 👈 limpia
    setUser(null);
  };

  return (
    <AuthCtx.Provider value={{ user, login, registerUser, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
