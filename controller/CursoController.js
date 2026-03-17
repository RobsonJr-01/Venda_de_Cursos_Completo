const CursoRepository = require('../backend/repository/CursoRepository');
const Curso           = require('../backend/models/Curso');
const { responder }   = require('../helpers/responder');

const repo = new CursoRepository();

class CursoController {

  async listarTodos(req, res) {
    try {
      const cursos = await repo.buscarTodos();
      responder(req, res, {
        status:   200,
        sucesso:  true,
        mensagem: `${cursos.length} curso(s) encontrado(s).`,
        total:    cursos.length,
        dados:    cursos,
      });
    } catch (err) {
      responder(req, res, { status: 500, sucesso: false, mensagem: 'Erro ao buscar cursos: ' + err.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const curso = await repo.buscarPorId(parseInt(req.params.id));
      if (!curso) {
        return responder(req, res, { status: 404, sucesso: false, mensagem: `Curso com ID ${req.params.id} não encontrado.` });
      }
      responder(req, res, { status: 200, sucesso: true, mensagem: `Curso encontrado.`, dados: curso });
    } catch (err) {
      responder(req, res, { status: 500, sucesso: false, mensagem: 'Erro ao buscar curso: ' + err.message });
    }
  }

  async buscarPorCategoria(req, res) {
    try {
      const cursos = await repo.buscarPorCategoria(req.params.categoria);
      responder(req, res, {
        status:   200,
        sucesso:  true,
        mensagem: `${cursos.length} curso(s) na categoria "${req.params.categoria}".`,
        total:    cursos.length,
        dados:    cursos,
        extra:    { categoria: req.params.categoria },
      });
    } catch (err) {
      responder(req, res, { status: 500, sucesso: false, mensagem: 'Erro ao filtrar por categoria: ' + err.message });
    }
  }

  async buscarPorNivel(req, res) {
    try {
      const cursos = await repo.buscarPorNivel(req.params.nivel);
      responder(req, res, {
        status:   200,
        sucesso:  true,
        mensagem: `${cursos.length} curso(s) no nível "${req.params.nivel}".`,
        total:    cursos.length,
        dados:    cursos,
        extra:    { nivel: req.params.nivel },
      });
    } catch (err) {
      responder(req, res, { status: 500, sucesso: false, mensagem: 'Erro ao filtrar por nível: ' + err.message });
    }
  }

  async cadastrar(req, res) {
    try {
      const { nome, descricao, dataInicio, duracao, cargaHoraria,
              nivel, preco, vagas, categoria, imagem, instrutorId } = req.body;

      const curso = new Curso({
        nome, descricao, dataInicio, duracao, cargaHoraria, nivel,
        preco:       parseFloat(preco),
        vagas:       parseInt(vagas),
        categoria,
        imagem:      imagem || '📚',
        instrutorId: instrutorId ? parseInt(instrutorId) : null,
      });

      const erros = curso.validar();
      if (erros.length > 0) {
        return responder(req, res, { status: 400, sucesso: false, mensagem: 'Dados inválidos.', extra: { erros } });
      }

      await repo.inserir(curso);
      responder(req, res, {
        status:   201,
        sucesso:  true,
        mensagem: `Curso "${curso.nome}" cadastrado com sucesso!`,
        dados:    curso,
      });
    } catch (err) {
      responder(req, res, { status: 500, sucesso: false, mensagem: 'Erro ao cadastrar curso: ' + err.message });
    }
  }

  async atualizar(req, res) {
    try {
      const id = parseInt(req.params.id);
      const existe = await repo.buscarPorId(id);
      if (!existe) {
        return responder(req, res, { status: 404, sucesso: false, mensagem: `Curso com ID ${id} não encontrado.` });
      }

      const { nome, descricao, dataInicio, duracao, cargaHoraria,
              nivel, preco, vagas, categoria, imagem, instrutorId } = req.body;

      const curso = new Curso({
        id, nome, descricao, dataInicio, duracao, cargaHoraria, nivel,
        preco:       parseFloat(preco),
        vagas:       parseInt(vagas),
        categoria,
        imagem:      imagem || existe.imagem,
        instrutorId: instrutorId ? parseInt(instrutorId) : null,
      });

      const erros = curso.validar();
      if (erros.length > 0) {
        return responder(req, res, { status: 400, sucesso: false, mensagem: 'Dados inválidos.', extra: { erros } });
      }

      await repo.atualizar(curso);
      responder(req, res, {
        status:   200,
        sucesso:  true,
        mensagem: `Curso "${curso.nome}" atualizado com sucesso!`,
        dados:    curso,
      });
    } catch (err) {
      responder(req, res, { status: 500, sucesso: false, mensagem: 'Erro ao atualizar curso: ' + err.message });
    }
  }

  async excluir(req, res) {
    try {
      const id = parseInt(req.params.id);
      const existe = await repo.buscarPorId(id);
      if (!existe) {
        return responder(req, res, { status: 404, sucesso: false, mensagem: `Curso com ID ${id} não encontrado.` });
      }

      await repo.excluir(id);
      responder(req, res, {
        status:   200,
        sucesso:  true,
        mensagem: `Curso "${existe.nome}" excluído com sucesso!`,
      });
    } catch (err) {
      responder(req, res, { status: 500, sucesso: false, mensagem: 'Erro ao excluir curso: ' + err.message });
    }
  }
}

module.exports = new CursoController();