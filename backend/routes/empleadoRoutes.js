const express = require('express');
const router = express.Router();
const { createEmpleado, listEmpleados } = require('../controllers/empleadoController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/', authMiddleware, roleMiddleware(['admin']), listEmpleados);
router.post('/', authMiddleware, roleMiddleware(['admin']), createEmpleado);

module.exports = router;
