const express = require('express');
const router = express.Router();
const { createSucursal, listSucursales } = require('../controllers/sucursalController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/', listSucursales);
router.post('/', authMiddleware, roleMiddleware(['admin']), createSucursal);

module.exports = router;
