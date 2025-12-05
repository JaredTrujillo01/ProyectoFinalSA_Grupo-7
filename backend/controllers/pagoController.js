const { generarPago, confirmarPago } = require('../services/pagoServices');

const createPago = async (req,res) => {
  try {
    const pago = await generarPago(req.body);
    res.status(201).json(pago);
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
};

const completarPago = async (req,res) => {
  try {
    const pago = await confirmarPago(parseInt(req.params.id));
    res.json(pago);
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
};

module.exports = { createPago, completarPago };
