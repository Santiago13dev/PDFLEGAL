import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { fetchTemplates, createTemplate, deleteTemplate, updateTemplate } from '../services/templates';
import ProtectedRoute from '../components/ProtectedRoute';

/**
 * Página de administración de plantillas. Permite a los usuarios con rol
 * administrador crear, actualizar y eliminar plantillas legales.
 */
const AdminTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    fields: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Cargar plantillas
  const loadTemplates = async () => {
    setLoading(true);
    try {
      const tpls = await fetchTemplates();
      setTemplates(tpls);
    } catch (err) {
      setError('Error al cargar plantillas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  // Gestionar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFieldChange = (index, key, value) => {
    setFormData((prev) => {
      const fields = [...prev.fields];
      fields[index] = { ...fields[index], [key]: value };
      return { ...prev, fields };
    });
  };

  const addField = () => {
    setFormData((prev) => ({
      ...prev,
      fields: [...prev.fields, { name: '', label: '', type: 'text', required: true }],
    }));
  };

  const removeField = (index) => {
    setFormData((prev) => {
      const fields = [...prev.fields];
      fields.splice(index, 1);
      return { ...prev, fields };
    });
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', content: '', fields: [] });
    setIsEditing(false);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateTemplate(editingId, formData);
      } else {
        await createTemplate(formData);
      }
      await loadTemplates();
      resetForm();
    } catch (err) {
      alert('Error al guardar plantilla');
    }
  };

  const handleEdit = (tpl) => {
    setFormData({
      title: tpl.title,
      description: tpl.description || '',
      content: tpl.content,
      fields: tpl.fields || [],
    });
    setIsEditing(true);
    setEditingId(tpl._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('¿Deseas eliminar esta plantilla?')) {
      try {
        await deleteTemplate(id);
        await loadTemplates();
      } catch (err) {
        alert('Error al eliminar plantilla');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Administrar plantillas</h1>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <>
            <button
              onClick={() => setShowForm(!showForm)}
              className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition"
            >
              {showForm ? 'Cerrar formulario' : 'Crear nueva plantilla'}
            </button>
            {showForm && (
              <form onSubmit={handleSubmit} className="mb-8 space-y-4 bg-white p-6 rounded-md shadow">
                <div>
                  <label className="block mb-1 font-medium">Título</label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Descripción</label>
                  <input
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Contenido (usa {{campo}} para insertar variables)</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md h-32"
                    required
                  />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Campos</h3>
                  {formData.fields.map((field, index) => (
                    <div key={index} className="mb-3 p-3 border rounded-md bg-gray-50">
                      <div className="flex gap-3 mb-2">
                        <div className="flex-1">
                          <label className="block text-sm font-medium">Nombre</label>
                          <input
                            value={field.name}
                            onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                            className="w-full px-2 py-1 border rounded-md"
                            required
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium">Etiqueta</label>
                          <input
                            value={field.label}
                            onChange={(e) => handleFieldChange(index, 'label', e.target.value)}
                            className="w-full px-2 py-1 border rounded-md"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex gap-3 items-center">
                        <div className="flex-1">
                          <label className="block text-sm font-medium">Tipo</label>
                          <select
                            value={field.type}
                            onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
                            className="w-full px-2 py-1 border rounded-md"
                          >
                            <option value="text">Texto</option>
                            <option value="number">Número</option>
                            <option value="date">Fecha</option>
                            <option value="textarea">Área de texto</option>
                          </select>
                        </div>
                        <div className="flex items-center space-x-2 mt-6">
                          <label className="inline-flex items-center text-sm font-medium">
                            <input
                              type="checkbox"
                              checked={field.required}
                              onChange={(e) => handleFieldChange(index, 'required', e.target.checked)}
                              className="mr-1"
                            />
                            Obligatorio
                          </label>
                          <button
                            type="button"
                            onClick={() => removeField(index)}
                            className="text-red-600 text-sm hover:underline"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addField}
                    className="mt-2 px-3 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300"
                  >
                    Añadir campo
                  </button>
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition"
                  >
                    {isEditing ? 'Actualizar' : 'Crear'} plantilla
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
            <h2 className="text-2xl font-semibold mb-4">Lista de plantillas</h2>
            {templates.length === 0 ? (
              <p>No hay plantillas.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Título</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Campos</th>
                      <th className="px-4 py-2" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {templates.map((tpl) => (
                      <tr key={tpl._id} className="bg-white">
                        <td className="px-4 py-2 whitespace-nowrap text-gray-800">{tpl.title}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-gray-600">
                          {tpl.fields?.length || 0}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-right space-x-3">
                          <button
                            className="text-blue-600 hover:underline text-sm"
                            onClick={() => handleEdit(tpl)}
                          >
                            Editar
                          </button>
                          <button
                            className="text-red-600 hover:underline text-sm"
                            onClick={() => handleDelete(tpl._id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminTemplates;
