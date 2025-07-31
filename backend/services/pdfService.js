/**
 * Servicio para generación de PDFs en el servidor.
 *
 * En el MVP, los PDFs se generan en el cliente usando html2pdf.js. Este
 * módulo está preparado para futuras mejoras en las que sea necesario
 * generar documentos PDF del lado del servidor (por ejemplo, utilizando
 * bibliotecas como `pdfkit` o `puppeteer`).
 */

/**
 * Genera un buffer de PDF a partir de un string HTML.
 * Por ahora este método es un stub y no realiza ninguna operación.
 *
 * @param {string} html Contenido HTML del documento
 * @returns {Promise<Buffer>} Buffer del PDF generado (actualmente vacío)
 */
async function generatePdfBuffer(html) {
  // TODO: Implementar generación de PDF en el servidor si se requiere
  return Buffer.from('');
}

module.exports = {
  generatePdfBuffer,
};
