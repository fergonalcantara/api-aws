const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudiante.controlller');
const { verificarToken } = require('../middlewares/auth.middleware');

router.use(verificarToken);

router.get('/', estudianteController.getAll);
router.get('/:id', estudianteController.getById);
router.post('/', estudianteController.create);
router.put('/:id', estudianteController.update);
router.delete('/:id', estudianteController.delete);

module.exports = router;