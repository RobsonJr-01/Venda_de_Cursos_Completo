class Instrutor {
  constructor({ id = null, nome, email, especialidade, bio = '', criadoEm = null }) {
    this.id            = id;
    this.nome          = nome;
    this.email         = email;
    this.especialidade = especialidade;
    this.bio           = bio;
    this.criadoEm      = criadoEm;
  } 

  validar() {
    const erros = [];
    if (!this.nome?.trim())           erros.push('"nome" é obrigatório.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) erros.push('"email" inválido.');
    if (!this.especialidade?.trim())  erros.push('"especialidade" é obrigatório.');
    return erros;
  }

  toString() {
    return `[Instrutor #${this.id}] ${this.nome} — ${this.especialidade} (${this.email})`;
  }
}

module.exports = Instrutor;