const { addEmpleado, findAllEmpleados } = require('../services/empleadoServices');

const createEmpleado = async (req,res) => {
  try {
    const e = await addEmpleado(req.body);
    res.status(201).json(e);
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
};

const listEmpleados = async (req,res) => {
  try {
    const list = await findAllEmpleados();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createEmpleado, listEmpleados };
