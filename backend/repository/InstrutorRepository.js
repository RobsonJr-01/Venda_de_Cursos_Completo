const pool      = require('../config/database');
const Instrutor = require('../models/Instrutor');

class InstrutorRepository {

  #mapear(row) {
    return new Instrutor({
      id: row.id, nome: row.nome, email: row.email,
      especialidade: row.especialidade, bio: row.bio, criadoEm: row.criado_em,
    });
  }

  async inserir(instrutor) {
    const erros = instrutor.validar();
    if (erros.length) throw new Error('Validação: ' + erros.join(' | '));
    const [r] = await pool.execute(
      'INSERT INTO instrutores (nome, email, especialidade, bio) VALUES (?, ?, ?, ?)',
      [instrutor.nome, instrutor.email, instrutor.especialidade, instrutor.bio]
    );
    instrutor.id = r.insertId;
    return instrutor;
  }

  async buscarTodos() {
    const [rows] = await pool.execute('SELECT * FROM instrutores ORDER BY nome');
    return rows.map(r => this.#mapear(r));
  }

  async buscarPorId(id) { 
    const [rows] = await pool.execute('SELECT * FROM instrutores WHERE id = ?', [id]);
    return rows.length ? this.#mapear(rows[0]) : null;
  }

  async atualizar(instrutor) {
    if (!instrutor.id) throw new Error('ID não informado.');
    const erros = instrutor.validar();
    if (erros.length) throw new Error('Validação: ' + erros.join(' | '));
    const [r] = await pool.execute(
      'UPDATE instrutores SET nome=?, email=?, especialidade=?, bio=? WHERE id=?',
      [instrutor.nome, instrutor.email, instrutor.especialidade, instrutor.bio, instrutor.id]
    );
    return r.affectedRows > 0;
  }

  async excluir(id) {
    const [r] = await pool.execute('DELETE FROM instrutores WHERE id = ?', [id]);
    return r.affectedRows > 0;
  }
}

module.exports = InstrutorRepository;