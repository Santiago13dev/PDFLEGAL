//formulario de inicio de sesión
import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { AuthProvider } from "../store/auth.jsx";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();
  async function onSubmit(e) {
    e.preventDefault();
    const res = await login(email, password);
    if (res?.ok) nav("/dashboard");
    else setMsg(res?.message || "Error");
  }
  return (
    <>
      <Navbar />
      <section className="container-app py-12">
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Ingresar</h2>
          <p className="text-sm text-slate-500">
            Usa cualquier email y contraseña (demo)
          </p>
          <form onSubmit={onSubmit} className="mt-4 space-y-3">
            <div>
              <label className="text-sm font-medium text-slate-800">
                Email
              </label>
              <input
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-800">
                Contraseña
              </label>
              <input
                type="password"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {msg && <p className="text-sm text-red-600">{msg}</p>}
            <div className="pt-2 flex gap-3">
              <button className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500">
                Entrar
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
