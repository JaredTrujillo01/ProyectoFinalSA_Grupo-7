const { createDevolucion } = require('../repositories/devolucionRepository');
const { findAlquilerById, updateAlquiler } = require('../repositories/alquilerRepository');
const { findEntregaByAlquilerId } = require('../repositories/entregaRepository');
const { findCarroById, updateCarro } = require('../repositories/carroRepository');
const { findCategoriaById } = require('../repositories/categoriaRepository');
const { createPago } = require('../repositories/pagoRepository');
const { sequelize } = require('../config/db');
const { ValidationError, NotFoundError } = require('../utils/errors');

const registrarDevolucion = async (data, empleado_id) => {
  if (!data.alquiler_id || !data.fecha_devolucion || !data.sucursal_id || !data.estado_carro) throw new ValidationError('Faltan datos de devolución');

  const alquiler = await findAlquilerById(data.alquiler_id);
  if (!alquiler) throw new NotFoundError('Alquiler no encontrado');

  const entrega = await findEntregaByAlquilerId(data.alquiler_id);
  if (!entrega) throw new ValidationError('No existe entrega registrada');

  const fechaEntrega = new Date(entrega.fecha_entrega);
  const fechaDevol = new Date(data.fecha_devolucion);
  let diffMs = fechaDevol - fechaEntrega;
  if (diffMs < 0) diffMs = 0;
  let days = Math.ceil(diffMs / (1000*60*60*24));
  days = days === 0 ? 1 : days;

  const carro = await findCarroById(alquiler.carro_id);
  if (!carro) throw new NotFoundError('Carro no encontrado');

  const categoria = await findCategoriaById(carro.categoria_id);
  if (!categoria) throw new NotFoundError('Categoría no encontrada');

  const costoTotal = parseFloat((categoria.costo_por_dia * days).toFixed(2));

  let cargosAdicionales = 0;
  if (data.estado_carro === 'dañado') cargosAdicionales += 200.00;

  return await sequelize.transaction(async (t) => {
    const devolucion = await createDevolucion({
      alquiler_id: data.alquiler_id,
      fecha_devolucion: data.fecha_devolucion,
      sucursal_id: data.sucursal_id,
      empleado_id,
      estado_carro: data.estado_carro
    }, { transaction: t });

    await updateAlquiler(alquiler.alquiler_id, { costo_total: (costoTotal + cargosAdicionales) }, { transaction: t });

    if (costoTotal + cargosAdicionales > 0) {
      await createPago({
        monto: (costoTotal + cargosAdicionales),
        metodo_pago: 'pendiente',
        estado: 'pendiente',
        alquiler_id: data.alquiler_id
      }, { transaction: t });
    }

    const newEstado = data.estado_carro === 'dañado' ? 'mantenimiento' : 'disponible';
    await updateCarro(carro.carro_id, { estado: newEstado }, { transaction: t });

    return { devolucion, costo: costoTotal + cargosAdicionales };
  });
};

module.exports = { registrarDevolucion };
