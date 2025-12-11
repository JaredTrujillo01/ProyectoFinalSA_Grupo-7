const Cliente = require('../models/Cliente');

const createCliente = async (data, options = {}) => {
  return await Cliente.create(data, options);
};
const findClienteById = async (id) => Cliente.findByPk(id);
const findAllClientes = async () => Cliente.findAll();
const updateCliente = async (id, changes, options = {}) => {
  // Solo actualizar campos específicos, evitar sobrescribir usuario_id
  const allowedFields = ['nombre', 'licencia', 'email', 'telefono'];
  const filteredChanges = {};
  allowedFields.forEach(field => {
    if (changes[field] !== undefined) {
      filteredChanges[field] = changes[field];
    }
  });
  await Cliente.update(filteredChanges, { where: { cliente_id: id }, ...options });
  return findClienteById(id);
};
const deleteCliente = async (id) => Cliente.destroy({ where: { cliente_id: id } });

module.exports = { createCliente, findClienteById, findAllClientes, updateCliente, deleteCliente };

