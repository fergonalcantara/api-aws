const express = require('express');
const router = express.Router();
const asignacionController = require('../controllers/asignacion.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

router.use(verificarToken);

router.get('/', asignacionController.getAll);
router.get('/:id', asignacionController.getById);
router.post('/', asignacionController.create);
router.put('/:id', asignacionController.update);
router.delete('/:id', asignacionController.delete);

module.exports = router;