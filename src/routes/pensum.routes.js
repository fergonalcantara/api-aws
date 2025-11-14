const express = require('express');
const router = express.Router();
const pensumController = require('../controllers/pensum.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

router.use(verificarToken);

router.get('/', pensumController.getAll);
router.get('/:id', pensumController.getById);
router.post('/', pensumController.create);
router.put('/:id', pensumController.update);
router.delete('/:id', pensumController.delete);

module.exports = router;