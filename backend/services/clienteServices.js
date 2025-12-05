const { createCliente, findClienteById, findAllClientes, updateCliente, deleteCliente } = require('../repositories/clienteRepository');
const { ValidationError, NotFoundError } = require('../utils/errors');

const createNewCliente = async (data) => {
  if (!data.nombre || !data.licencia || !data.email || !data.telefono) throw new ValidationError('Faltan campos obligatorios de cliente');
  // Business rule: could check unique email/licencia here (use repository)
  return await createCliente(data);
};

const getCliente = async (id) => {
  const c = await findClienteById(id);
  if (!c) throw new NotFoundError('Cliente no encontrado');
  return c;
};


module.exports = { createNewCliente, getCliente, findAllClientes, updateCliente, deleteCliente };
