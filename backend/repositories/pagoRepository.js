const Pago = require('../models/Pago');

const createPago = (data, options = {}) => {
  return Pago.create(data, options);
};

const findPagoByAlquilerId = (alquiler_id) => {
  return Pago.findOne({ where: { alquiler_id } });
};

module.exports = { createPago, findPagoByAlquilerId };
