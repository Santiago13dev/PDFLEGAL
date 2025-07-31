/**
 * Reemplaza los marcadores de posición en una cadena de plantilla con los
 * valores proporcionados. Los marcadores deben estar en formato {{campo}}.
 *
 * @param {string} templateString Cadena de la plantilla
 * @param {Object} data Datos proporcionados por el usuario
 * @returns {string} String con los valores sustituidos
 */
function replacePlaceholders(templateString, data) {
  let output = templateString;
  Object.keys(data).forEach((key) => {
    const regex = new RegExp(`{{\s*${key}\s*}}`, 'g');
    output = output.replace(regex, data[key]);
  });
  return output;
}

module.exports = {
  replacePlaceholders,
};
