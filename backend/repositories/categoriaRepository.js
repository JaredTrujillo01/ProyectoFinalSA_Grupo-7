const Categoria = require('../models/Categoria');

const createCategoria = async (data) => Categoria.create(data);
const findCategoriaById = async (id) => Categoria.findByPk(id);
const findAllCategorias = async () => Categoria.findAll();
const updateCategoria = async (id, changes) => { await Categoria.update(changes, { where: { categoria_id: id } }); return findCategoriaById(id); };
const deleteCategoria = async (id) => Categoria.destroy({ where: { categoria_id: id } });

module.exports = { createCategoria, findCategoriaById, findAllCategorias, updateCategoria, deleteCategoria };
