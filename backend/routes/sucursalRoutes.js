const express = require('express');
const router = express.Router();
const { createSucursal, listSucursales, editSucursal, removeSucursal } = require('../controllers/sucursalController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/', listSucursales);
router.post('/', authMiddleware, roleMiddleware(['admin']), createSucursal);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), editSucursal);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), removeSucursal);

module.exports = router;
