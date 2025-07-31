import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { fetchDocumentById } from '../services/documents';
import html2pdf from 'html2pdf.js';

/**
 * Página de vista previa del documento generado. Permite visualizar el HTML
 * resultante y exportarlo a PDF mediante html2pdf.js.
 */
const Preview = () => {
  const { id } = useParams();
  const [documentData, setDocumentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        const doc = await fetchDocumentById(id);
        setDocumentData(doc);
      } catch (err) {
        setError('Error al cargar el documento');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const downloadPdf = () => {
    if (!contentRef.current) return;
    const opt = {
      margin: 10,
      filename: `${documentData.template?.title || 'documento'}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };
    html2pdf().from(contentRef.current).set(opt).save();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <p>Cargando documento...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : documentData ? (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {documentData.template?.title || 'Documento'}
            </h1>
            <div
              ref={contentRef}
              id="doc-content"
              className="p-6 bg-white shadow rounded-md prose max-w-none overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: documentData.generatedHtml }}
            />
            <button
              onClick={downloadPdf}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition"
            >
              Descargar PDF
            </button>
          </div>
        ) : (
          <p>No se encontró el documento.</p>
        )}
      </main>
    </div>
  );
};

export default Preview;
