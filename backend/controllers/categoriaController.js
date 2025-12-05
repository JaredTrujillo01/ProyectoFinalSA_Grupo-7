const { addCategoria, findCategoriaById, findAllCategorias, updateCategoria, deleteCategoria } = require('../services/categoriaService');

const createCategoria = async (req,res) => {
  try {
    const cat = await addCategoria(req.body);
    res.status(201).json(cat);
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
};

const listCategorias = async (req,res) => {
  try {
    const cats = await findAllCategorias();
    res.json(cats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createCategoria, listCategorias };
