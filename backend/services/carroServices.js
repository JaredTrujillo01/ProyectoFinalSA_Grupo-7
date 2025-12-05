const { createCarro, findCarroById, findAllCarros, updateCarro, deleteCarro } = require('../repositories/carroRepository');
const { findCategoriaById } = require('../repositories/categoriaRepository');
const { ValidationError, NotFoundError } = require('../utils/errors');

const addCarro = async (data) => {
  if (!data.placa || !data.marca || !data.modelo || !data.categoria_id) throw new ValidationError('Faltan campos para carro');
  const cat = await findCategoriaById(data.categoria_id);
  if (!cat) throw new ValidationError('Categoría no válida');
  return await createCarro(data);
};

module.exports = { addCarro, findCarroById, findAllCarros, updateCarro, deleteCarro };
