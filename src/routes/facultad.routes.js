const express = require('express');
const router = express.Router();
const facultadController = require('../controllers/facultad.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

// Todas las rutas requieren autenticación
router.use(verificarToken);

router.get('/', facultadController.getAll);
router.get('/:id', facultadController.getById);
router.post('/', facultadController.create);
router.put('/:id', facultadController.update);
router.delete('/:id', facultadController.delete);

module.exports = router;