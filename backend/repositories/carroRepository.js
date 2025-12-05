const Carro = require('../models/Carro');

const createCarro = async (data) => Carro.create(data);
const findCarroById = async (id) => Carro.findByPk(id);
const findAllCarros = async (filter = {}) => Carro.findAll({ where: filter });
const updateCarro = async (id, changes, options = {}) => { await Carro.update(changes, { where: { carro_id: id }, ...options }); return findCarroById(id); };
const deleteCarro = async (id) => Carro.destroy({ where: { carro_id: id } });

module.exports = { createCarro, findCarroById, findAllCarros, updateCarro, deleteCarro };
