const Devolucion = require('../models/Devolucion');

const createDevolucion = async (data, options = {}) => Devolucion.create(data, options);
const findDevolucionById = async (id) => Devolucion.findByPk(id);

module.exports = { createDevolucion, findDevolucionById };
