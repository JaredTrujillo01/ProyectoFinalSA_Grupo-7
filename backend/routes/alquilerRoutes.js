const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { crearAlquiler, cancelarAlquiler } = require('../controllers/alquilerController');

// CLIENTE CREA RESERVA
router.post('/', authMiddleware, roleMiddleware(['cliente']), crearAlquiler);

// CANCELAR RESERVA
router.put('/:id/cancelar', authMiddleware, cancelarAlquiler);

module.exports = router;
