const Alquiler = require('../models/Alquiler');

const createAlquiler = async (data, options = {}) => Alquiler.create(data, options);
const findAlquilerById = async (id) => Alquiler.findByPk(id);
const findAlquileresByCliente = async (cliente_id) => Alquiler.findAll({ where: { cliente_id } });
const updateAlquiler = async (id, changes, options = {}) => { await Alquiler.update(changes, { where: { alquiler_id: id }, ...options }); return findAlquilerById(id); };
const findActiveAlquilersByCarro = async (carro_id) => Alquiler.findAll({ where: { carro_id, costo_total: null } });

module.exports = { createAlquiler, findAlquilerById, findAlquileresByCliente, updateAlquiler, findActiveAlquilersByCarro };
