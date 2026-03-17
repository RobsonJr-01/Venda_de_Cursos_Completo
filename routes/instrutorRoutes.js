const express             = require('express');
const router              = express.Router();
const InstrutorController = require('../controller/InstrutorController');

router.get('/',      (req, res) => InstrutorController.listarTodos(req, res));
router.post('/',     (req, res) => InstrutorController.cadastrar(req, res));
router.get('/:id',   (req, res) => InstrutorController.buscarPorId(req, res));
router.put('/:id',   (req, res) => InstrutorController.atualizar(req, res));
router.delete('/:id',(req, res) => InstrutorController.excluir(req, res));

module.exports = router;
