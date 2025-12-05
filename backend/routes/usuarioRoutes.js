// routes/usuarioRoutes.js

const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Ruta solo admin: ver todos los usuarios
router.get(
  '/',
  authMiddleware,            // primero valida token
  roleMiddleware(['admin']), // luego revisa rol
  async (req, res) => {
    try {
      const usuarios = await Usuario.findAll();
      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;

