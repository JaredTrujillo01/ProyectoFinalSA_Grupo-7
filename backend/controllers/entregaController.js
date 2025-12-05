const { registrarEntrega } = require('../services/entregaServices');

const createEntrega = async (req,res) => {
  try {
    const empleadoId = req.user.rol === 'empleado' ? req.user.id : req.body.empleado_id;
    const entrega = await registrarEntrega(req.body, empleadoId);
    res.status(201).json(entrega);
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
};

module.exports = { createEntrega };
