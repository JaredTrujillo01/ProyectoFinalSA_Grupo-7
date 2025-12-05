const express = require('express');
const router = express.Router();
const { createPago, completarPago } = require('../controllers/pagoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, createPago);
router.put('/:id/complete', authMiddleware, completarPago);

module.exports = router;
