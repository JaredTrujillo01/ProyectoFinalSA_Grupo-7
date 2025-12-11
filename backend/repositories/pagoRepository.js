const Pago = require('../models/Pago');

const createPago = (data, options = {}) => {
  return Pago.create(data, options);
};

const findPagoByAlquilerId = (alquiler_id) => {
  return Pago.findOne({ where: { alquiler_id } });
};

const findPagoById = (pago_id) => {
  return Pago.findOne({ where: { pago_id } });
};

const findAll = () => {
  return Pago.findAll();
};

const updatePago = (pago_id, data, options = {}) => {
  return Pago.update(data, { where: { pago_id }, ...options });
};

module.exports = { createPago, findPagoByAlquilerId, findPagoById, findAll, updatePago };
