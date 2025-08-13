import React, { useState } from "react";
import { useAuth } from "../store/auth.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();            // ← evita submit por defecto
    setMsg("");
    setLoading(true);
    const res = await login({ email, password });   // ← PASA UN OBJETO
    setLoading(false);

    if (res.ok) navigate("/dashboard", { replace: true });
    else setMsg(res.message || "Credenciales inválidas");
  }

  return (
    <form onSubmit={onSubmit}>      {/* ← NO llames onSubmit() aquí */}
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}  // ← solo actualiza estado
      />

      <label>Contraseña</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // ← nada de login aquí
      />

      {msg && <p style={{color:'red'}}>{msg}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
