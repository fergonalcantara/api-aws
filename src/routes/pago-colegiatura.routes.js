const express = require('express');
const router = express.Router();
const pagoColegiaturaController = require('../controllers/pago-colegiatura.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

router.use(verificarToken);

router.get('/', pagoColegiaturaController.getAll);
router.get('/:id', pagoColegiaturaController.getById);
router.post('/', pagoColegiaturaController.create);
router.put('/:id', pagoColegiaturaController.update);
router.delete('/:id', pagoColegiaturaController.delete);

module.exports = router;