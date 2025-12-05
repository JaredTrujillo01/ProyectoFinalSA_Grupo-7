const express = require('express');
const router = express.Router();
const { createEntrega } = require('../controllers/entregaController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/', authMiddleware, roleMiddleware(['empleado','admin']), createEntrega);

module.exports = router;
