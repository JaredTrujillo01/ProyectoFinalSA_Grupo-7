const express = require('express');
const router = express.Router();
const { createCliente, getClientes, getClienteById } = require('../controllers/clienteController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/', createCliente); // public or admin flow
router.get('/', authMiddleware, roleMiddleware(['admin','empleado']), getClientes);
router.get('/:id', authMiddleware, roleMiddleware(['admin','empleado','cliente']), getClienteById);

module.exports = router;
