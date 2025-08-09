//Su objetivo es que el usuario pueda moverse entre secciones en cualquier momento.
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useAuth } from "../store/auth.js";
export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <nav className="w-full sticky top-0 z-10 border-b bg-white">
      <div className="container-app py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-5 w-5" />
          <span className="font-semibold text-slate-900">LegalDocs Pro</span>
          <span className="ml-3 hidden sm:inline text-xs text-slate-500">
            Asistente Legal Ciudadano
          </span>
        </Link>
        <div className="flex items-center gap-2 text-sm">
          <Link
            to="/search"
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            Normativa (beta)
          </Link>
          {user && (
            <Link
              to="/upload"
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Subir documento
            </Link>
          )}
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                Ingresar
              </Link>
              <Link
                to="/register"
                className="px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
              >
                Comenzar Gratis
              </Link>
            </>
          ) : (
            <>
              <span className="hidden sm:inline text-slate-600">
                Hola, {user.name}
              </span>
              <Link
                to="/dashboard"
                className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  logout();
                  nav("/");
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
