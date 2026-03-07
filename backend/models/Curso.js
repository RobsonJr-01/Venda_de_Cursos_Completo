class Curso {
  constructor({
    id = null, nome, descricao, dataInicio, duracao, cargaHoraria,
    nivel, preco, vagas, categoria, imagem = '📚',
    instrutorId = null, instrutorNome = null,
    criadoEm = null, atualizadoEm = null,
  }) {
    this.id           = id;
    this.nome         = nome;
    this.descricao    = descricao;
    this.dataInicio   = dataInicio;
    this.duracao      = duracao;
    this.cargaHoraria = cargaHoraria;
    this.nivel        = nivel;
    this.preco        = preco;
    this.vagas        = vagas;
    this.categoria    = categoria;
    this.imagem       = imagem;
    this.instrutorId  = instrutorId;
    this.instrutorNome = instrutorNome;
    this.criadoEm     = criadoEm;
    this.atualizadoEm = atualizadoEm;
  }

  validar() {
    const erros = [];
    if (!this.nome?.trim())          erros.push('"nome" é obrigatório.');
    if (!this.descricao?.trim())     erros.push('"descricao" é obrigatório.');
    if (!this.dataInicio)            erros.push('"dataInicio" é obrigatório.');
    if (!this.duracao?.trim())       erros.push('"duracao" é obrigatório.');
    if (!this.cargaHoraria?.trim())  erros.push('"cargaHoraria" é obrigatório.');
    if (!['Iniciante','Intermediário','Avançado'].includes(this.nivel))
                                     erros.push('"nivel" inválido.');
    if (isNaN(this.preco)  || this.preco  < 0) erros.push('"preco" deve ser positivo.');
    if (isNaN(this.vagas)  || this.vagas  < 0) erros.push('"vagas" deve ser positivo.');
    if (!this.categoria?.trim())     erros.push('"categoria" é obrigatório.');
    return erros;
  }

  toString() {
    return `[Curso #${this.id}] ${this.nome} | ${this.nivel} | R$ ${Number(this.preco).toFixed(2)} | ${this.vagas} vagas`;
  }
}

module.exports = Curso;