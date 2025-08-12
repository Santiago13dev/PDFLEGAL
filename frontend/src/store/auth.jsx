import { createContext, useContext, useState } from "react";
import { API as api } from "../api/client.js";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    try {
      const { data } = await api.post("/auth/login", credentials);
      setUser(data.user || data);
      return { ok: true, data };
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Error de login";
      return { ok: false, message };
    }
  };

  const registerUser = async ({ name, email, password }) => {
    try {
      const { data } = await api.post("/auth/register", { name, email, password });
      setUser(data.user || { name, email });
      return { ok: true, data };
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Error de registro";
      return { ok: false, message };
    }
  };

  const logout = async () => {
    try { await api.get("/auth/logout"); } catch {}
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
