import { z } from 'zod';

/**
 * Construye dinámicamente un esquema de Zod a partir de una lista de campos.
 * Este helper se utiliza para validar formularios generados de forma dinámica
 * mediante React Hook Form.
 *
 * @param {Array<{name: string, type: string, required: boolean}>} fields
 * @returns {z.ZodObject}
 */
export function buildSchema(fields) {
  const shape = {};
  fields.forEach((field) => {
    let validator = z.string();
    if (field.type === 'number') {
      // Transforma el valor de entrada a número si no está vacío
      validator = z.preprocess((val) => (val !== '' ? Number(val) : undefined), z.number());
    }
    if (field.required) {
      validator = validator.min(1, { message: `El campo ${field.label} es obligatorio` });
    } else {
      validator = validator.optional();
    }
    shape[field.name] = validator;
  });
  return z.object(shape);
}
