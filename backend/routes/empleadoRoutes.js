const express = require('express');
const router = express.Router();
const { createEmpleado, listEmpleados, editEmpleado, removeEmpleado } = require('../controllers/empleadoController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/', authMiddleware, roleMiddleware(['admin']), listEmpleados);
router.post('/', authMiddleware, roleMiddleware(['admin']), createEmpleado);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), editEmpleado);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), removeEmpleado);

module.exports = router;
