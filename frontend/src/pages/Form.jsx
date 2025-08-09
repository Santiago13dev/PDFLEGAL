import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Stepper from "../components/Stepper.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { TemplateAPI, DocumentAPI } from "../services/api.js";
import { replacePlaceholders } from "../utils/placeholder.js";
function DynamicField({ f, defaultValue, error }) {
  const common =
    "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600";
  const inputType =
    f.type === "number" ? "number" : f.type === "date" ? "date" : "text";
  return (
    <div>
      <label className="text-sm font-medium text-slate-800">
        {f.label}
        {f.required && <span className="text-red-600"> *</span>}
      </label>
      {f.type === "textarea" ? (
        <textarea
          name={f.name}
          className={`${common} min-h-28`}
          defaultValue={defaultValue}
        />
      ) : (
        <input
          name={f.name}
          type={inputType}
          className={common}
          defaultValue={defaultValue}
        />
      )}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
export default function Form() {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const [errors, setErrors] = useState({});
  const nav = useNavigate();
  useEffect(() => {
    TemplateAPI.list().then((res) => {
      const t = (res.items || []).find((x) => x._id === id);
      setTemplate(t || null);
    });
  }, [id]);
  function validate(fields, data) {
    const e = {};
    (fields || []).forEach((f) => {
      if (f.required && !data[f.name]) e[f.name] = "Este campo es obligatorio";
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  }
  async function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (!validate(template.fields, data)) return;
    const rendered = replacePlaceholders(template.content, data);
    const res = await DocumentAPI.create(template._id, data);
    if (res?.ok)
      nav(`/preview/${template._id}`, {
        state: { html: rendered, title: template.title },
      });
  }
  if (!template)
    return (
      <>
        <Navbar />
        <section className="container-app py-10">Cargando...</section>
      </>
    );
  return (
    <>
      <Navbar />
      <section className="container-app py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">
              {template.title}
            </h2>
            <Stepper step={1} />
          </div>
          <p className="text-slate-700">
            Completa los campos para generar tu documento
          </p>
          <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
            {(template.fields || []).map((f) => (
              <DynamicField
                key={f.name}
                f={f}
                defaultValue={""}
                error={errors[f.name]}
              />
            ))}
            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50"
                onClick={() => nav("/dashboard")}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500"
              >
                Generar vista previa
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
