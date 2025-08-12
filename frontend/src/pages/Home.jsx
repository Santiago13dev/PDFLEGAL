import React from "react";
import Navbar from "../components/Navbar.jsx";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth.jsx"; // ✅ si necesitas el usuario
export default function Home() {
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      <section className="container-app py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              ⚡ Nuevo: IA Legal Avanzada
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              Revoluciona tus{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                documentos legales
              </span>
            </h1>
            <p className="mt-4 text-slate-700 text-lg">
              La plataforma más avanzada para crear, editar y gestionar
              documentos legales. Potenciada por IA y diseñada para
              profesionales exigentes.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to={user ? "/upload" : "/register"}
                className="px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-500 shadow-sm"
              >
                Subir Documento
              </Link>
              <Link
                to="/dashboard"
                className="px-5 py-3 rounded-xl border border-blue-600 text-blue-700 hover:bg-blue-50"
              >
                Explorar Plantillas
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="h-56 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 font-medium">
                Vista previa del documento
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="h-20 rounded-lg bg-slate-50 border border-slate-200" />
                <div className="h-20 rounded-lg bg-slate-50 border border-slate-200" />
                <div className="h-20 rounded-lg bg-slate-50 border border-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

