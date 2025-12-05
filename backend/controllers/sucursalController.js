const { addSucursal, findAllSucursales } = require('../services/sucursalServices');

const createSucursal = async (req,res) => {
  try {
    const s = await addSucursal(req.body);
    res.status(201).json(s);
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
};

const listSucursales = async (req,res) => {
  try {
    const s = await findAllSucursales();
    res.json(s);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createSucursal, listSucursales };
