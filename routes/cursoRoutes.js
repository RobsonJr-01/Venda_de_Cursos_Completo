const express         = require('express');
const router          = express.Router();
const CursoController = require('../controller/CursoController');

router.get('/',                         (req, res) => CursoController.listarTodos(req, res));
router.post('/',                        (req, res) => CursoController.cadastrar(req, res));
router.get('/categoria/:categoria',     (req, res) => CursoController.buscarPorCategoria(req, res));
router.get('/nivel/:nivel',             (req, res) => CursoController.buscarPorNivel(req, res));
router.get('/:id',                      (req, res) => CursoController.buscarPorId(req, res));
router.put('/:id',                      (req, res) => CursoController.atualizar(req, res));
router.delete('/:id',                   (req, res) => CursoController.excluir(req, res));

module.exports = router;
