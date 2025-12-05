const { createCategoria, findCategoriaById, findAllCategorias, updateCategoria, deleteCategoria } = require('../repositories/categoriaRepository');
const { ValidationError, NotFoundError } = require('../utils/errors');

const addCategoria = async (data) => {
  if (!data.nombre || data.costo_por_dia == null) throw new ValidationError('Datos incompletos');
  if (parseFloat(data.costo_por_dia) < 0) throw new ValidationError('Costo inválido');
  return await createCategoria(data);
};

module.exports = { addCategoria, findCategoriaById, findAllCategorias, updateCategoria, deleteCategoria };
