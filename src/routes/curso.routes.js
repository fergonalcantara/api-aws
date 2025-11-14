const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/curso.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

router.use(verificarToken);

router.get('/', cursoController.getAll);
router.get('/:id', cursoController.getById);
router.post('/', cursoController.create);
router.put('/:id', cursoController.update);
router.delete('/:id', cursoController.delete);

module.exports = router;