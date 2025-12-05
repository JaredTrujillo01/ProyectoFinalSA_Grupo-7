const Sucursal = require('../models/Sucursal');

const createSucursal = async (data) => Sucursal.create(data);
const findSucursalById = async (id) => Sucursal.findByPk(id);
const findAllSucursales = async () => Sucursal.findAll();
const updateSucursal = async (id, changes) => { await Sucursal.update(changes, { where: { sucuersal_id: id } }); return findSucursalById(id); };
const deleteSucursal = async (id) => Sucursal.destroy({ where: { sucuersal_id: id } });

module.exports = { createSucursal, findSucursalById, findAllSucursales, updateSucursal, deleteSucursal };
