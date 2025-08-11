// Aquí usamos AuthContext para guardar:
//Datos del usuario logueado.
//Token JWT.
//Funciones como login(), logout().

import React, { createContext, useContext, useState } from "react";
import { AuthAPI } from "../services/api.js";
const AuthCtx = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("pdflegal_user");
    return raw ? JSON.parse(raw) : null;
  });
  function saveSession(token, u) {
    localStorage.setItem("pdflegal_token", token);
    localStorage.setItem("pdflegal_user", JSON.stringify(u));
    setUser(u);
  }
  async function login(email, password) {
    const r = await AuthAPI.login(email, password);
    if (r?.ok) saveSession(r.token, r.user);
    return r;
  }
  async function register(name, email, password) {
    const r = await AuthAPI.register(name, email, password);
    if (r?.ok) {
      const l = await AuthAPI.login(email, password);
      if (l?.ok) saveSession(l.token, l.user);
    }
    return r;
  }
  function logout() {
    localStorage.removeItem("pdflegal_token");
    localStorage.removeItem("pdflegal_user");
    setUser(null);
  }
  return (
    <AuthCtx.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
export function useAuth() {
  return useContext(AuthCtx);
}
