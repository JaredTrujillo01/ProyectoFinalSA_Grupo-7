const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { crearAlquiler, cancelarAlquiler } = require('../controllers/alquilerController');

// CLIENTE CREA RESERVA
router.post('/', authMiddleware, roleMiddleware(['cliente']), crearAlquiler);

// GET ALL ALQUILERES (para admin/empleados)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const Alquiler = require('../models/Alquiler');
    const alquileres = await Alquiler.findAll();
    res.json(alquileres);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET ALQUILER BY ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const Alquiler = require('../models/Alquiler');
    const alquiler = await Alquiler.findOne({
      where: { alquiler_id: req.params.id }
    });
    if (!alquiler) return res.status(404).json({ error: 'Alquiler no encontrado' });
    res.json(alquiler);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ACTUALIZAR ALQUILER (para cambiar estado, etc.)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const Alquiler = require('../models/Alquiler');
    const alquiler = await Alquiler.findOne({
      where: { alquiler_id: req.params.id }
    });
    
    if (!alquiler) return res.status(404).json({ error: 'Alquiler no encontrado' });
    
    // Permitir actualizar solo ciertos campos
    const allowedFields = ['estado', 'costo_total', 'fecha_fin'];
    const updates = {};
    
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });
    
    await alquiler.update(updates);
    const updated = await Alquiler.findOne({
      where: { alquiler_id: req.params.id }
    });
    
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// CANCELAR RESERVA
router.put('/:id/cancelar', authMiddleware, cancelarAlquiler);

module.exports = router;
