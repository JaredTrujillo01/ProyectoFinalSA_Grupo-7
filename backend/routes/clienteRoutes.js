const express = require('express');
const router = express.Router();
const { createCliente, getClientes, getClienteById, editCliente, removeCliente } = require('../controllers/clienteController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/', createCliente); // public or admin flow
router.get('/', authMiddleware, roleMiddleware(['admin','empleado']), getClientes);
router.get('/:id', authMiddleware, roleMiddleware(['admin','empleado','cliente']), getClienteById);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), editCliente);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), removeCliente);

module.exports = router;
