const { registerUsuario, loginUsuario } = require('../services/authServices');

const register = async (req, res) => {
  try {
    const usuario = await registerUsuario(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const token = await loginUsuario(req.body.email, req.body.password);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const registerAdmin = async (req, res) => {
  try {
    const data = req.body;
    data.rol = 'admin'; // Forzamos rol admin
    const usuario = await registerUsuario(data);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { register, login, registerAdmin };
