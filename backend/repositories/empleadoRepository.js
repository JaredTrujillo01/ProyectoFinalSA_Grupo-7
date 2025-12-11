const Empleado = require('../models/Empleado');

const createEmpleado = async (data, options = {}) => await Empleado.create(data, options);
const findEmpleadoById = async (id) => Empleado.findByPk(id);
const findAllEmpleados = async () => Empleado.findAll();
const updateEmpleado = async (id, changes) => {
  // Solo actualizar campos específicos, evitar sobrescribir usuario_id
  const allowedFields = ['nombre', 'cargo', 'sucursal_id'];
  const filteredChanges = {};

  allowedFields.forEach(field => {
    if (changes[field] !== undefined) {
      // Convertir string vacío a null para sucursal_id
      if (field === 'sucursal_id' && changes[field] === '') {
        filteredChanges[field] = null;
      } else {
        filteredChanges[field] = changes[field];
      }
    }
  });
  console.log('Actualizando empleado', id, 'con:', filteredChanges);
  await Empleado.update(filteredChanges, { where: { empleado_id: id } });
  return findEmpleadoById(id);
};
const deleteEmpleado = async (id) => Empleado.destroy({ where: { empleado_id: id } });

module.exports = { createEmpleado, findEmpleadoById, findAllEmpleados, updateEmpleado, deleteEmpleado };

