const Carro = require('../models/Carro');
const Categoria = require('../models/Categoria');

// Relación para poder incluir la categoría al consultar carros
Carro.belongsTo(Categoria, { foreignKey: 'categoria_id', as: 'categoria' });

const createCarro = async (data) => {
	const created = await Carro.create(data);
	// Devuelve con la categoría incluida para que el frontend pueda renderizar precio y nombre
	return findCarroById(created.carro_id);
};
const findCarroById = async (id) => Carro.findByPk(id, { include: [{ model: Categoria, as: 'categoria' }] });
const findAllCarros = async (filter = {}) => Carro.findAll({ where: filter, include: [{ model: Categoria, as: 'categoria' }] });
const updateCarro = async (id, changes, options = {}) => { await Carro.update(changes, { where: { carro_id: id }, ...options }); return findCarroById(id); };
const deleteCarro = async (id) => Carro.destroy({ where: { carro_id: id } });

module.exports = { createCarro, findCarroById, findAllCarros, updateCarro, deleteCarro };
