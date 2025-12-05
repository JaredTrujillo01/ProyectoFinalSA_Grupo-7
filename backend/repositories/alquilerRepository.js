const Alquiler = require('../models/Alquiler');

// Crear un alquiler
const createAlquiler = (data, options = {}) => {
  return Alquiler.create(data, options);
};

// Buscar por ID
const findAlquilerById = (id) => {
  return Alquiler.findByPk(id);
};

// Buscar reservas activas de un carro (para validar disponibilidad)
const findActiveAlquileresByCarro = (carro_id) => {
  return Alquiler.findAll({
    where: {
      carro_id,
      estado: ['reservado', 'activo']
    }
  });
};

// Actualizar alquiler
const updateAlquiler = (id, data, options = {}) => {
  return Alquiler.update(data, { where: { alquiler_id: id }, ...options });
};

// Obtener alquiler completo del cliente
const findAlquileresByCliente = (cliente_id) => {
  return Alquiler.findAll({
    where: { cliente_id }
  });
};

// Cancelar alquiler
const cancelAlquiler = (id, options = {}) => {
  return Alquiler.update(
    { estado: "cancelado" },
    { where: { alquiler_id: id }, ...options }
  );
};

module.exports = {
  createAlquiler,
  findAlquilerById,
  findActiveAlquileresByCarro,
  updateAlquiler,
  cancelAlquiler,
  findAlquileresByCliente
};
