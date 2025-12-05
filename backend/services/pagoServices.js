const { createPago, findPagoById, updatePago } = require('../repositories/pagoRepository');
const { ValidationError, NotFoundError } = require('../utils/errors');

const generarPago = async (data) => {
  if (!data.monto || !data.metodo_pago || !data.alquiler_id) throw new ValidationError('Datos de pago incompletos');
  return await createPago({ monto: data.monto, metodo_pago: data.metodo_pago, estado: 'pendiente', alquiler_id: data.alquiler_id });
};

const confirmarPago = async (pago_id) => {
  const pago = await findPagoById(pago_id);
  if (!pago) throw new NotFoundError('Pago no encontrado');
  return await updatePago(pago_id, { estado: 'completado' });
};

module.exports = { generarPago, confirmarPago };
