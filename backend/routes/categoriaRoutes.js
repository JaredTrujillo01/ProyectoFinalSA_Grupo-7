const express = require('express');
const router = express.Router();
const { createCategoria, listCategorias } = require('../controllers/categoriaController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/', listCategorias);
router.post('/', authMiddleware, roleMiddleware(['admin']), createCategoria);

module.exports = router;
