const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rol.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

router.use(verificarToken);

router.get('/', rolController.getAll);
router.get('/:id', rolController.getById);
router.post('/', rolController.create);
router.put('/:id', rolController.update);
router.delete('/:id', rolController.delete);

// Ruta especial para asignar permisos a un rol
router.post('/:id/permisos', rolController.asignarPermisos);

module.exports = router;