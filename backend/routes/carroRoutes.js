const express = require('express');
const router = express.Router();
const { createCarro, listCarros } = require('../controllers/carroController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/', listCarros);
router.post('/', authMiddleware, roleMiddleware(['admin']), createCarro);

module.exports = router;
