const express = require('express');
const router = express.Router();
const historialAcademicoController = require('../controllers/historial-academico.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

router.use(verificarToken);

router.get('/', historialAcademicoController.getAll);
router.get('/:id', historialAcademicoController.getById);
router.post('/', historialAcademicoController.create);
router.put('/:id', historialAcademicoController.update);
router.delete('/:id', historialAcademicoController.delete);

module.exports = router;