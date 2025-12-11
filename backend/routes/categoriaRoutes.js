const express = require('express');
const router = express.Router();
const { createCategoria, listCategorias, editCategoria, removeCategoria } = require('../controllers/categoriaController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/', listCategorias);
router.post('/', authMiddleware, roleMiddleware(['admin']), createCategoria);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), editCategoria);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), removeCategoria);

module.exports = router;
