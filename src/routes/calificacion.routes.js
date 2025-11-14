const express = require('express');
const router = express.Router();
const calificacionController = require('../controllers/calificacion.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

router.use(verificarToken);

router.get('/', calificacionController.getAll);
router.get('/:id', calificacionController.getById);
router.post('/', calificacionController.create);
router.put('/:id', calificacionController.update);
router.delete('/:id', calificacionController.delete);

module.exports = router;