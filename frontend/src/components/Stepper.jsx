//Su objetivo es guiar visualmente y mostrar progreso dentro de ese flujo.
import React from "react";
export default function Stepper({ step = 1 }) {
  const steps = ["Datos", "Vista previa", "Descarga"];
  return (
    <ol className="flex items-center gap-4 text-sm">
      {steps.map((label, i) => {
        const idx = i + 1;
        const active = idx <= step;
        return (
          <li key={label} className="flex items-center gap-2">
            <span
              className={`size-6 grid place-content-center rounded-full border ${active ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-500"}`}
            >
              {idx}
            </span>
            <span className={`${active ? "text-slate-900" : "text-slate-500"}`}>
              {label}
            </span>
            {idx < steps.length && (
              <span className="mx-2 text-slate-300">—</span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
