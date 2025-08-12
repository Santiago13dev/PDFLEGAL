// src/store/auth.jsx
import { createContext, useContext, useState } from "react";

const AuthCtx = createContext(null);
const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    const res = await fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(credentials),
    });
    if (!res.ok) throw new Error("Error de login");
    const data = await res.json();
    setUser(data.user || data);
    return { ok: true, data };
  };

  const registerUser = async ({ name, email, password }) => {
    const res = await fetch(`${API}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { ok: false, message: err.message || "Error de registro" };
    }
    const data = await res.json();
    setUser(data.user || { name, email });
    return { ok: true, data };
  };

  const logout = async () => {
    try { await fetch(`${API}/api/auth/logout`, { credentials: "include" }); } catch {}
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
