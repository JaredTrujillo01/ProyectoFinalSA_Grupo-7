const { addCarro, findCarroById, findAllCarros, updateCarro, deleteCarro } = require('../services/carroServices');

const createCarro = async (req,res) => {
  try {
    const carro = await addCarro(req.body);
    res.status(201).json(carro);
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
};

const listCarros = async (req,res) => {
  try {
    // optionally filter by query params
    const filter = {};
    if (req.query.categoria_id) filter.categoria_id = req.query.categoria_id;
    if (req.query.estado) filter.estado = req.query.estado;
    const carros = await findAllCarros(filter);
    res.json(carros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCarros = async (req, res) => {
  try {
    const carros = await Carro.findAll({
      include: [{ model: Categoria, as: 'categoria' }]  // Incluye categoría
    });
    res.json(carros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editCarro = async (req, res) => {
  try {
    const updated = await updateCarro(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
};

const removeCarro = async (req, res) => {
  try {
    await deleteCarro(req.params.id);
    res.json({ message: "Carro eliminado" });
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
};

module.exports = { createCarro, listCarros, getCarros, editCarro, removeCarro };
