const { createSucursal, findSucursalById, findAllSucursales, updateSucursal, deleteSucursal } = require('../repositories/sucursalRepository');
const { ValidationError } = require('../utils/errors');

const addSucursal = async (data) => {
  if (!data.nombre) throw new ValidationError('Nombre requerido');
  return await createSucursal(data);
};

module.exports = { addSucursal, findSucursalById, findAllSucursales, updateSucursal, deleteSucursal };
