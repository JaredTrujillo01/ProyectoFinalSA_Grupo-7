const Empleado = require('../models/Empleado');

const createEmpleado = async (data, options = {}) => await Empleado.create(data, options);
const findEmpleadoById = async (id) => Empleado.findByPk(id);
const findAllEmpleados = async () => Empleado.findAll();
const updateEmpleado = async (id, changes) => { await Empleado.update(changes, { where: { empleado_id: id } }); return findEmpleadoById(id); };
const deleteEmpleado = async (id) => Empleado.destroy({ where: { empleado_id: id } });

module.exports = { createEmpleado, findEmpleadoById, findAllEmpleados, updateEmpleado, deleteEmpleado };

