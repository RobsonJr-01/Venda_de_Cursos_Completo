const pool  = require('../config/database');
const Curso = require('../models/Curso');

class CursoRepository {

  #mapear(row) { 
    return new Curso({
      id:            row.id,
      nome:          row.nome,
      descricao:     row.descricao,
      dataInicio:    row.data_inicio instanceof Date
                       ? row.data_inicio.toISOString().split('T')[0]
                       : row.data_inicio,
      duracao:       row.duracao,
      cargaHoraria:  row.carga_horaria,
      nivel:         row.nivel,
      preco:         Number(row.preco),
      vagas:         row.vagas,
      categoria:     row.categoria,
      imagem:        row.imagem,
      instrutorId:   row.instrutor_id,
      instrutorNome: row.instrutor_nome ?? null,
      criadoEm:      row.criado_em,
      atualizadoEm:  row.atualizado_em,
    });
  }

  async inserir(curso) {
    const erros = curso.validar();
    if (erros.length) throw new Error('Validação: ' + erros.join(' | '));

    const sql = `INSERT INTO cursos
      (nome, descricao, data_inicio, duracao, carga_horaria, nivel, preco, vagas, categoria, imagem, instrutor_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const [r] = await pool.execute(sql, [
      curso.nome, curso.descricao, curso.dataInicio, curso.duracao,
      curso.cargaHoraria, curso.nivel, curso.preco, curso.vagas,
      curso.categoria, curso.imagem, curso.instrutorId ?? null,
    ]);
    curso.id = r.insertId;
    return curso;
  }

  async buscarTodos() {
    const [rows] = await pool.execute(`
      SELECT c.*, i.nome AS instrutor_nome
      FROM cursos c
      LEFT JOIN instrutores i ON i.id = c.instrutor_id
      ORDER BY c.id
    `);
    return rows.map(r => this.#mapear(r));
  }

  async buscarPorId(id) {
    const [rows] = await pool.execute(`
      SELECT c.*, i.nome AS instrutor_nome
      FROM cursos c
      LEFT JOIN instrutores i ON i.id = c.instrutor_id
      WHERE c.id = ?
    `, [id]);
    return rows.length ? this.#mapear(rows[0]) : null;
  }

  async buscarPorCategoria(categoria) {
    const [rows] = await pool.execute(`
      SELECT c.*, i.nome AS instrutor_nome
      FROM cursos c
      LEFT JOIN instrutores i ON i.id = c.instrutor_id
      WHERE c.categoria = ? ORDER BY c.nome
    `, [categoria]);
    return rows.map(r => this.#mapear(r));
  }

  async buscarPorNivel(nivel) {
    const [rows] = await pool.execute(`
      SELECT c.*, i.nome AS instrutor_nome
      FROM cursos c
      LEFT JOIN instrutores i ON i.id = c.instrutor_id
      WHERE c.nivel = ? ORDER BY c.preco
    `, [nivel]);
    return rows.map(r => this.#mapear(r));
  }

  async atualizar(curso) {
    if (!curso.id) throw new Error('ID não informado para atualização.');
    const erros = curso.validar();
    if (erros.length) throw new Error('Validação: ' + erros.join(' | '));

    const sql = `UPDATE cursos SET
      nome=?, descricao=?, data_inicio=?, duracao=?, carga_horaria=?,
      nivel=?, preco=?, vagas=?, categoria=?, imagem=?, instrutor_id=?
      WHERE id=?`;

    const [r] = await pool.execute(sql, [
      curso.nome, curso.descricao, curso.dataInicio, curso.duracao,
      curso.cargaHoraria, curso.nivel, curso.preco, curso.vagas,
      curso.categoria, curso.imagem, curso.instrutorId ?? null, curso.id,
    ]);
    return r.affectedRows > 0;
  }

  async excluir(id) {
    const [r] = await pool.execute('DELETE FROM cursos WHERE id = ?', [id]);
    return r.affectedRows > 0;
  }

  async contarTodos() {
    const [rows] = await pool.execute('SELECT COUNT(*) AS total FROM cursos');
    return rows[0].total;
  }

  async somarVagas() {
    const [rows] = await pool.execute('SELECT SUM(vagas) AS total FROM cursos');
    return rows[0].total ?? 0;
  }
}

module.exports = CursoRepository;