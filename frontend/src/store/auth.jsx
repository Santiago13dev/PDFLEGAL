// Aquí usamos AuthContext para guardar:
//Datos del usuario logueado.
//Token JWT.
//Funciones como login(), logout().

import { createContext, useContext, useEffect, useState } from "react";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);     // null = no logueado
  const [loading, setLoading] = useState(false); // true si verificas sesión

  // Ejemplo: restaurar sesión desde localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const login = (u) => { setUser(u); localStorage.setItem("user", JSON.stringify(u)); };
  const logout = () => { setUser(null); localStorage.removeItem("user"); };

  const value = { user, loading, login, logout };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
