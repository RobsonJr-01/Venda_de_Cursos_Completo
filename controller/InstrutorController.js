const InstrutorRepository = require('../backend/repository/InstrutorRepository');
const Instrutor           = require('../backend/models/Instrutor');
const { responder }       = require('../helpers/responder');

const repo = new InstrutorRepository();

class InstrutorController {

  async listarTodos(req, res) {
    try {
      const instrutores = await repo.buscarTodos();
      responder(req, res, {
        status:   200,
        sucesso:  true,
        mensagem: `${instrutores.length} instrutor(es) encontrado(s).`,
        total:    instrutores.length,
        dados:    instrutores,
      });
    } catch (err) {
      responder(req, res, { status: 500, sucesso: false, mensagem: 'Erro ao buscar instrutores: ' + err.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const instrutor = await repo.buscarPorId(parseInt(req.params.id));
      if (!instrutor) {
        return responder(req, res, { status: 404, sucesso: false, mensagem: `Instrutor com ID ${req.params.id} não encontrado.` });
      }
      responder(req, res, { status: 200, sucesso: true, mensagem: 'Instrutor encontrado.', dados: instrutor });
    } catch (err) {
      responder(req, res, { status: 500, sucesso: false, mensagem: 'Erro ao buscar instrutor: ' + err.message });
    }
  }

  async cadastrar(req, res) {
    try {
      const { nome, email, especialidade, bio } = req.body;
      const instrutor = new Instrutor({ nome, email, especialidade, bio: bio || '' });

      const erros = instrutor.validar();
      if (erros.length > 0) {
        return responder(req, res, { status: 400, sucesso: false, mensagem: 'Dados inválidos.', extra: { erros } });
      }

      await repo.inserir(instrutor);
      responder(req, res, {
        status:   201,
        sucesso:  true,
        mensagem: `Instrutor "${instrutor.nome}" cadastrado com sucesso!`,
        dados:    instrutor,
      });
    } catch (err) {
      responder(req, res, { status: 500, sucesso: false, mensagem: 'Erro ao cadastrar instrutor: ' + err.message });
    }
  }

  async atualizar(req, res) {
    try {
      const id = parseInt(req.params.id);
      const existe = await repo.buscarPorId(id);
      if (!existe) {
        return responder(req, res, { status: 404, sucesso: false, mensagem: `Instrutor com ID ${id} não encontrado.` });
      }

      const { nome, email, especialidade, bio } = req.body;
      const instrutor = new Instrutor({ id, nome, email, especialidade, bio: bio || '' });

      const erros = instrutor.validar();
      if (erros.length > 0) {
        return responder(req, res, { status: 400, sucesso: false, mensagem: 'Dados inválidos.', extra: { erros } });
      }

      await repo.atualizar(instrutor);
      responder(req, res, {
        status:   200,
        sucesso:  true,
        mensagem: `Instrutor "${instrutor.nome}" atualizado com sucesso!`,
        dados:    instrutor,
      });
    } catch (err) {
      responder(req, res, { status: 500, sucesso: false, mensagem: 'Erro ao atualizar instrutor: ' + err.message });
    }
  }

  async excluir(req, res) {
    try {
      const id = parseInt(req.params.id);
      const existe = await repo.buscarPorId(id);
      if (!existe) {
        return responder(req, res, { status: 404, sucesso: false, mensagem: `Instrutor com ID ${id} não encontrado.` });
      }

      await repo.excluir(id);
      responder(req, res, {
        status:   200,
        sucesso:  true,
        mensagem: `Instrutor "${existe.nome}" excluído com sucesso!`,
      });
    } catch (err) {
      responder(req, res, { status: 500, sucesso: false, mensagem: 'Erro ao excluir instrutor: ' + err.message });
    }
  }
}

module.exports = new InstrutorController();