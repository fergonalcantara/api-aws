const express = require('express');
const router = express.Router();
const permisoController = require('../controllers/permiso.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

router.use(verificarToken);

router.get('/', permisoController.getAll);
router.get('/:id', permisoController.getById);
router.post('/', permisoController.create);
router.put('/:id', permisoController.update);
router.delete('/:id', permisoController.delete);

module.exports = router;