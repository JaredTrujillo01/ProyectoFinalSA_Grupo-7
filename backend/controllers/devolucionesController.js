const { registrarDevolucion } = require('../services/devolucionServices');

const createDevolucion = async (req,res) => {
  try {
    const empleadoId = req.user.rol === 'empleado' ? req.user.id : req.body.empleado_id;
    const result = await registrarDevolucion(req.body, empleadoId);
    res.status(201).json(result);
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
};

module.exports = { createDevolucion };
