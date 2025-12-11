const express = require('express');
const router = express.Router();
const { createPago, completarPago, getAllPagos, getPagoById } = require('../controllers/pagoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, getAllPagos);
router.get('/:id', authMiddleware, getPagoById);
router.post('/', authMiddleware, createPago);
router.put('/:id/complete', authMiddleware, completarPago);

module.exports = router;
