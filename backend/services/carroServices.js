const { createCarro, findCarroById, findAllCarros, updateCarro, deleteCarro } = require('../repositories/carroRepository');
const { findCategoriaById } = require('../repositories/categoriaRepository');
const { ValidationError, NotFoundError } = require('../utils/errors');

const addCarro = async (data) => {
  if (!data.placa || !data.marca || !data.modelo || !data.categoria_id) throw new ValidationError('Faltan campos para carro');
  // año ahora requerido
  if (data.anio === undefined || data.anio === null || String(data.anio).trim() === '') throw new ValidationError('Año (anio) es requerido');

  const anioInt = parseInt(data.anio, 10);
  if (Number.isNaN(anioInt) || anioInt <= 1800 || anioInt > 3000) throw new ValidationError('Año (anio) inválido');

  const cat = await findCategoriaById(data.categoria_id);
  if (!cat) throw new ValidationError('Categoría no válida');

  // Normalizar datos a insertar
  const payload = { ...data, anio: anioInt };

  return await createCarro(payload);
};

module.exports = { addCarro, findCarroById, findAllCarros, updateCarro, deleteCarro };
