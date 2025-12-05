const { createEntrega, findEntregaByAlquilerId } = require('../repositories/entregaRepository');
const { findAlquilerById } = require('../repositories/alquilerRepository');
const { updateCarro } = require('../repositories/carroRepository');
const { sequelize } = require('../config/db');
const { ValidationError, NotFoundError } = require('../utils/errors');

const registrarEntrega = async (data, empleado_id) => {
  if (!data.alquiler_id || !data.fecha_entrega || !data.sucursal_id || !data.estado_vehiculo) throw new ValidationError('Faltan datos de entrega');

  const alquiler = await findAlquilerById(data.alquiler_id);
  if (!alquiler) throw new NotFoundError('Alquiler no encontrado');

  return await sequelize.transaction(async (t) => {
    const entrega = await createEntrega({
      alquiler_id: data.alquiler_id,
      fecha_entrega: data.fecha_entrega,
      sucursal_id: data.sucursal_id,
      empleado_id,
      estado_vehiculo: data.estado_vehiculo
    }, { transaction: t });

    await updateCarro(alquiler.carro_id, { estado: 'alquilado' }, { transaction: t });
    return entrega;
  });
};

module.exports = { registrarEntrega, findEntregaByAlquilerId };
