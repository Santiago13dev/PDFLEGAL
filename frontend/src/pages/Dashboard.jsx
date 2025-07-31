import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../store/AuthContext';
import { fetchTemplates } from '../services/templates';
import { fetchDocuments } from '../services/documents';

/**
 * Panel principal para el usuario autenticado. Muestra las plantillas disponibles
 * para generar documentos y el historial de documentos del usuario.
 */
const Dashboard = () => {
  const { user } = useAuth();
  const [templates, setTemplates] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [tpls, docs] = await Promise.all([fetchTemplates(), fetchDocuments()]);
        setTemplates(tpls);
        setDocuments(docs);
      } catch (err) {
        setError('Error al cargar datos');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Dashboard</h1>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <>
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Plantillas disponibles</h2>
              {templates.length === 0 ? (
                <p>No hay plantillas disponibles en este momento.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map((tpl) => (
                    <div
                      key={tpl._id}
                      className="border rounded-lg p-4 bg-white shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{tpl.title}</h3>
                        {tpl.description && (
                          <p className="text-gray-600 text-sm mb-4">{tpl.description}</p>
                        )}
                      </div>
                      <Link
                        to={`/form/${tpl._id}`}
                        className="mt-auto inline-block text-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition"
                      >
                        Crear documento
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Historial de documentos</h2>
              {documents.length === 0 ? (
                <p>Aún no has creado documentos.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Título</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Fecha</th>
                        <th className="px-4 py-2" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {documents.map((doc) => (
                        <tr key={doc._id} className="bg-white">
                          <td className="px-4 py-2 whitespace-nowrap text-gray-800">
                            {doc.template?.title || 'Documento'}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-gray-600">
                            {new Date(doc.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-2 text-right whitespace-nowrap">
                            {/* Podríamos enlazar a una vista de detalles o descarga del PDF */}
                            <Link
                              to={`/preview/${doc._id}`}
                              className="text-indigo-600 hover:underline"
                            >
                              Ver
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
