const { addEmpleado, findAllEmpleados, updateEmpleado, deleteEmpleado } = require('../services/empleadoServices');

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

const editEmpleado = async (req, res) => {
  try {
    const updated = await updateEmpleado(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
};

const removeEmpleado = async (req, res) => {
  try {
    await deleteEmpleado(req.params.id);
    res.json({ message: "Empleado eliminado" });
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
};

module.exports = { createEmpleado, listEmpleados, editEmpleado, removeEmpleado };
