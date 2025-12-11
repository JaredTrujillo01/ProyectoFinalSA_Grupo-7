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

const editSucursal = async (req, res) => {
  try {
    const { updateSucursal } = require('../services/sucursalServices');
    const updated = await updateSucursal(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
};

const removeSucursal = async (req, res) => {
  try {
    const { deleteSucursal } = require('../services/sucursalServices');
    await deleteSucursal(req.params.id);
    res.json({ message: "Sucursal eliminada" });
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
};

module.exports = { createSucursal, listSucursales, editSucursal, removeSucursal };
