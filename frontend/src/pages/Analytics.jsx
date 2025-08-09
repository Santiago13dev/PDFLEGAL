import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import { AnalyticsAPI } from '../services/analytics.js'

export default function Analytics() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    AnalyticsAPI.statsByTemplate()
      .then(res => setItems(res.items || []))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Navbar />
      <section className="container-app py-10">
        <h2 className="text-2xl font-bold text-slate-900">Estadísticas por plantilla</h2>
        <p className="text-slate-700">Documentos generados y última actividad.</p>

        {loading ? (
          <p className="mt-6 text-slate-600">Cargando...</p>
        ) : items.length === 0 ? (
          <p className="mt-6 text-slate-600">Sin datos aún.</p>
        ) : (
          <div className="mt-6 overflow-auto">
            <table className="min-w-full text-sm border border-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-3 py-2 text-left border-b">Plantilla</th>
                  <th className="px-3 py-2 text-left border-b">Descripción</th>
                  <th className="px-3 py-2 text-left border-b">Docs generados</th>
                  <th className="px-3 py-2 text-left border-b">Última vez</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={String(it.templateId)}>
                    <td className="px-3 py-2 border-b">{it.title || '—'}</td>
                    <td className="px-3 py-2 border-b text-slate-600">{it.description || '—'}</td>
                    <td className="px-3 py-2 border-b font-medium">{it.count}</td>
                    <td className="px-3 py-2 border-b text-slate-600">
                      {it.lastAt ? new Date(it.lastAt).toLocaleString() : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  )
}
