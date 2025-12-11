const express = require('express');
const router = express.Router();
const { createCarro, listCarros, editCarro, removeCarro } = require('../controllers/carroController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/', authMiddleware, listCarros);
router.post('/', authMiddleware, roleMiddleware(['admin']), createCarro);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), editCarro);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), removeCarro);

module.exports = router;
