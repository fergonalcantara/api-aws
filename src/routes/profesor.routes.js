const express = require('express');
const router = express.Router();
const profesorController = require('../controllers/profesor.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

router.use(verificarToken);

router.get('/', profesorController.getAll);
router.get('/:id', profesorController.getById);
router.post('/', profesorController.create);
router.put('/:id', profesorController.update);
router.delete('/:id', profesorController.delete);

module.exports = router;