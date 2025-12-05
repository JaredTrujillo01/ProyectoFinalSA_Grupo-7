const { createNewCliente, getCliente, findAllClientes, updateCliente, deleteCliente } = require('../services/clienteServices');
const createCliente = async (req, res) => {
  try {
    const cliente = await createNewCliente(req.body);
    res.status(201).json(cliente);
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
};

const getClientes = async (req, res) => {
  try {
    const lista = await findAllClientes();
    res.json(lista);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getClienteById = async (req, res) => {
  try {
    const cliente = await getCliente(parseInt(req.params.id));
    res.json(cliente);
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
};

module.exports = { createCliente, getClientes, getClienteById};