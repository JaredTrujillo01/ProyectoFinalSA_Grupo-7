const { createEmpleado, findEmpleadoById, findAllEmpleados, updateEmpleado, deleteEmpleado } = require('../repositories/empleadoRepository');
const { ValidationError, NotFoundError } = require('../utils/errors');

const addEmpleado = async (data) => {
  if (!data.nombre || !data.cargo) throw new ValidationError('Datos de empleado incompletos');
  return await createEmpleado(data);
};

module.exports = { addEmpleado, findEmpleadoById, findAllEmpleados, updateEmpleado, deleteEmpleado };
