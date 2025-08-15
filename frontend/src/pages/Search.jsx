// busqueda indexada de la ley de colombia
import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
const MOCK = [
  {
    id: "N-001",
    titulo: "Constitución Política de Colombia (1991)",
    tipo: "Constitución",
    ente: "Asamblea Constituyente",
    fecha: "1991-07-04",
  },
  {
    id: "N-002",
    titulo: "Ley 1480 de 2011 (Estatuto del Consumidor)",
    tipo: "Ley",
    ente: "Congreso",
    fecha: "2011-10-12",
  },
  {
    id: "N-003",
    titulo: "Decreto 1074 de 2015 (DUR Comercio)",
    tipo: "Decreto",
    ente: "MinCIT",
    fecha: "2015-05-26",
  },
  {
    id: "N-004",
    titulo: "Sentencia T-123 de 2020 (garantías y reclamaciones)",
    tipo: "Sentencia",
    ente: "Corte Constitucional",
    fecha: "2020-03-10",
  },
];
export default function Search() {
  const [q, setQ] = useState("");
  const results = MOCK.filter((n) =>
    n.titulo.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <>
      <Navbar />
      <section className="container-app py-10">
        <h2 className="text-2xl font-bold text-slate-900">
          Normativa colombiana (beta)
        </h2>
        <p className="text-slate-700">Demo visual: resultados mock.</p>
        <div className="mt-4 flex gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar: 'consumidor', 'garantía', 'autorización'..."
            className="flex-1 rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500">
            Buscar
          </button>
        </div>
        <div className="mt-6 space-y-3">
          {results.map((r) => (
            <div
              key={r.id}
              className="rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">{r.titulo}</h3>
                <span className="text-xs rounded-full bg-slate-50 px-2 py-1 border border-slate-200 text-slate-700">
                  {r.tipo}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                {r.ente} · {r.fecha}
              </p>
              <div className="mt-2 flex gap-2">
                <button className="text-sm px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50">
                  Ver resumen
                </button>
                <button className="text-sm px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50">
                  Abrir fuente
                </button>
                <button className="text-sm px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500">
                  Usar como referencia
                </button>
              </div>
            </div>
          ))}
          {results.length === 0 && (
            <p className="text-sm text-slate-600">
              Sin resultados. Prueba con otra palabra clave.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
