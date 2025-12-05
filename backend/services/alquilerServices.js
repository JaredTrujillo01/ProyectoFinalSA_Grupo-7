const { sequelize } = require('../config/db');
const Alquiler = require('../models/Alquiler');
const { createAlquiler } = require('../repositories/alquilerRepository');
const { createPago, findPagoByAlquilerId } = require('../repositories/pagoRepository');
const { findCarroById, updateCarro } = require('../repositories/carroRepository');
const { findCategoriaById } = require('../repositories/categoriaRepository');
const { findClienteByUsuarioId, findClienteById } = require('../repositories/clienteRepository');
const { ValidationError, NotFoundError } = require('../utils/errors');

// VERIFICAR SOLAPAMIENTO DE FECHAS
const rangesOverlap = (startA, endA, startB, endB) => {
  return !(endA < startB || endB < startA);
};

// CREAR RESERVA
const createReservation = async ({ usuario_id, carro_id, fecha_inicio, fecha_fin, pagarAhora = true, metodo_pago = "tarjeta" }) => {
  
  if (!usuario_id || !carro_id || !fecha_inicio || !fecha_fin) {
    throw new ValidationError("Faltan datos obligatorios");
  }

  const inicio = new Date(fecha_inicio);
  const fin = new Date(fecha_fin);

  if (fin < inicio) throw new ValidationError("fecha_fin debe ser >= fecha_inicio");

  const cliente = await findClienteByUsuarioId(usuario_id);
  if (!cliente) throw new ValidationError("El usuario no está vinculado a un cliente");

  const carro = await findCarroById(carro_id);
  if (!carro) throw new NotFoundError("Carro no encontrado");

  // VALIDAR DISPONIBILIDAD
  const overlapping = await Alquiler.findAll({
    where: {
      carro_id,
      estado: ['reservado', 'activo']
    }
  });

  for (const a of overlapping) {
    if (rangesOverlap(inicio, fin, new Date(a.fecha_inicio), new Date(a.fecha_fin))) {
      throw new ValidationError("El carro no está disponible en ese rango de fechas");
    }
  }

  // CALCULAR COSTO
  const categoria = await findCategoriaById(carro.categoria_id);
  const dias = Math.ceil((fin - inicio) / (1000 * 60 * 60 * 24)) + 1;
  const costo_total = dias * parseFloat(categoria.costo_por_dia);

  // Transacción completa
  return await sequelize.transaction(async (t) => {

    const alquiler = await createAlquiler({
      cliente_id: cliente.cliente_id,
      carro_id,
      fecha_inicio,
      fecha_fin,
      estado: 'reservado',
      costo_total
    }, { transaction: t });

    await createPago({
      alquiler_id: alquiler.alquiler_id,
      monto: costo_total,
      metodo_pago: pagarAhora ? metodo_pago : "pendiente",
      estado: pagarAhora ? "completado" : "pendiente"
    }, { transaction: t });

    await updateCarro(carro_id, { estado: "reservado" }, { transaction: t });

    return {
      alquiler,
      detalle: {
        dias,
        costo_total,
        costo_por_dia: categoria.costo_por_dia
      }
    };
  });
};


// CANCELAR RESERVA
const cancelReservation = async (alquiler_id, usuario) => {
  const alquiler = await Alquiler.findByPk(alquiler_id);
  if (!alquiler) throw new NotFoundError("Alquiler no encontrado");

  const cliente = await findClienteById(alquiler.cliente_id);

  if (usuario.rol !== "admin" && usuario.id !== cliente.usuario_id) {
    throw new ValidationError("No autorizado a cancelar este alquiler");
  }

  if (alquiler.estado !== "reservado") {
    throw new ValidationError("Solo reservas pueden cancelarse");
  }

  return await sequelize.transaction(async (t) => {
    await Alquiler.update({ estado: "cancelado" }, { where: { alquiler_id }, transaction: t });
    await updateCarro(alquiler.carro_id, { estado: "disponible" }, { transaction: t });

    const pago = await findPagoByAlquilerId(alquiler_id);

    if (pago) {
      await pago.update({ estado: "cancelado" }, { transaction: t });
    }

    return { message: "Reserva cancelada exitosamente" };
  });
};

module.exports = { createReservation, cancelReservation };
