import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Navbar from '../components/Navbar';
import { fetchTemplateById } from '../services/templates';
import { createDocument } from '../services/documents';
import { buildSchema } from '../utils/schema';

/**
 * Página para rellenar una plantilla específica. Construye dinámicamente el
 * formulario según los campos definidos en la plantilla y crea un documento.
 */
const DocumentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar plantilla al iniciar
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const tpl = await fetchTemplateById(id);
        setTemplate(tpl);
      } catch (err) {
        setError('Error al obtener la plantilla');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  // Construir esquema y valores por defecto cuando la plantilla cambia
  const schema = useMemo(() => {
    return template ? buildSchema(template.fields || []) : null;
  }, [template]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: schema ? zodResolver(schema) : undefined });

  const onSubmit = async (data) => {
    try {
      const doc = await createDocument({ templateId: id, data });
      navigate(`/preview/${doc._id}`);
    } catch (err) {
      console.error(err);
      alert('Error al crear el documento');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">Cargando plantilla...</main>
      </div>
    );
  }
  if (error || !template) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center text-red-600">
          {error || 'Plantilla no encontrada'}
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">{template.title}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {template.fields.map((field) => (
            <div key={field.name}>
              <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor={field.name}>
                {field.label}
                {field.required && <span className="text-red-500"> *</span>}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  {...register(field.name)}
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <input
                  id={field.name}
                  type={field.type}
                  {...register(field.name)}
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              )}
              {errors[field.name] && (
                <p className="mt-1 text-sm text-red-600">{errors[field.name]?.message}</p>
              )}
            </div>
          ))}
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition disabled:opacity-50"
          >
            {isSubmitting ? 'Generando...' : 'Generar documento'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default DocumentForm;
