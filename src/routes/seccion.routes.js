const express = require('express');
const router = express.Router();
const seccionController = require('../controllers/seccion.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

router.use(verificarToken);

router.get('/', seccionController.getAll);
router.get('/:id', seccionController.getById);
router.post('/', seccionController.create);
router.put('/:id', seccionController.update);
router.delete('/:id', seccionController.delete);

module.exports = router;