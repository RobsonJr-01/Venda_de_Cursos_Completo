const BASE_CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Segoe UI', sans-serif;
    background: #0f1117;
    color: #e2e8f0;
    min-height: 100vh;
    padding: 36px 20px;
  }
  .container { max-width: 860px; margin: 0 auto; }
  .topo {
    display: flex; align-items: center; gap: 12px; margin-bottom: 6px;
  }
  .topo a {
    color: #475569; font-size: .82rem; text-decoration: none;
    border: 1px solid #1e293b; border-radius: 5px; padding: 3px 10px;
  }
  .topo a:hover { color: #94a3b8; border-color: #334155; }
  h1 { font-size: 1.4rem; font-weight: 700; color: #fff; }
  .sub { color: #64748b; font-size: .88rem; margin-bottom: 28px; margin-top: 4px; }
  .badge {
    display: inline-block; padding: 2px 9px; border-radius: 4px;
    font-size: .7rem; font-weight: 700; text-transform: uppercase; letter-spacing: .05em;
  }
  .get    { background:#052e16; color:#4ade80; border:1px solid #166534; }
  .post   { background:#1e3a5f; color:#60a5fa; border:1px solid #1d4ed8; }
  .put    { background:#422006; color:#fb923c; border:1px solid #9a3412; }
  .delete { background:#3b0a0a; color:#f87171; border:1px solid #991b1b; }
  .ok     { background:#052e16; color:#4ade80; border:1px solid #166534; }
  .erro   { background:#3b0a0a; color:#f87171; border:1px solid #991b1b; }
  .warn   { background:#422006; color:#fb923c; border:1px solid #9a3412; }
  .card {
    background: #1a1f2e; border: 1px solid #1e293b;
    border-radius: 10px; padding: 20px 24px; margin-bottom: 12px;
  }
  .card-header {
    display: flex; align-items: center; gap: 10px; margin-bottom: 12px;
  }
  .card-title { font-size: 1rem; font-weight: 600; color: #fff; }
  .campo {
    display: flex; gap: 8px; margin-bottom: 6px; font-size: .85rem; align-items: baseline;
  }
  .campo-label { color: #475569; min-width: 120px; font-size: .78rem; text-transform: uppercase; letter-spacing:.04em; }
  .campo-valor { color: #cbd5e1; }
  .campo-valor.destaque { color: #4ade80; font-weight: 600; font-size: .95rem; }
  .mensagem-box {
    border-radius: 8px; padding: 16px 20px; margin-bottom: 24px;
    font-size: .92rem; font-weight: 500; display:flex; align-items:center; gap:10px;
  }
  .mensagem-ok   { background:#052e16; color:#4ade80; border:1px solid #166534; }
  .mensagem-erro { background:#3b0a0a; color:#f87171; border:1px solid #991b1b; }
  .mensagem-warn { background:#422006; color:#fb923c; border:1px solid #9a3412; }
  .total-badge {
    background: #1e293b; border: 1px solid #334155; color: #94a3b8;
    padding: 3px 10px; border-radius: 999px; font-size: .75rem; margin-left: 8px;
  }
  hr { border: none; border-top: 1px solid #1e293b; margin: 20px 0; }
`;

function isNavegador(req) {
  const accept = req.headers['accept'] || '';
  return accept.includes('text/html');
}

function htmlPage(titulo, conteudo) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${titulo} | Robson Cursos API</title>
  <style>${BASE_CSS}</style>
</head>
<body>
  <div class="container">
    ${conteudo}
    <hr>
    <p style="color:#334155;font-size:.78rem;text-align:center;padding:8px 0">
      Robson Cursos API — <a href="/" style="color:#475569">← Início</a>
    </p>
  </div>
</body>
</html>`;
}

function campoHtml(label, valor, destaque = false) {
  return `<div class="campo">
    <span class="campo-label">${label}</span>
    <span class="campo-valor ${destaque ? 'destaque' : ''}">${valor ?? '—'}</span>
  </div>`;
}

function cursoCard(c) {
  const preco = Number(c.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const nivelClass = { 'Iniciante': 'ok', 'Intermediário': 'put', 'Avançado': 'delete' };
  return `
  <div class="card">
    <div class="card-header">
      <span style="font-size:1.6rem">${c.imagem}</span>
      <span class="card-title">${c.nome}</span>
      <span class="badge ${nivelClass[c.nivel] || 'ok'}">${c.nivel}</span>
      <span class="badge get">${c.categoria}</span>
    </div>
    ${campoHtml('ID', c.id)}
    ${campoHtml('Descrição', c.descricao)}
    ${campoHtml('Preço', preco, true)}
    ${campoHtml('Vagas', c.vagas)}
    ${campoHtml('Início', c.dataInicio)}
    ${campoHtml('Duração', c.duracao)}
    ${campoHtml('Carga Horária', c.cargaHoraria)}
    ${campoHtml('Instrutor', c.instrutorNome || c.instrutorId || '—')}
  </div>`;
}

function instrutorCard(i) {
  return `
  <div class="card">
    <div class="card-header">
      <span style="font-size:1.4rem">👨‍🏫</span>
      <span class="card-title">${i.nome}</span>
      <span class="badge get">${i.especialidade}</span>
    </div>
    ${campoHtml('ID', i.id)}
    ${campoHtml('E-mail', i.email)}
    ${campoHtml('Bio', i.bio)}
  </div>`;
}

function responder(req, res, { status = 200, sucesso, mensagem, dados, total, extra = {} }) {
  if (!isNavegador(req)) {
    const payload = { sucesso, ...extra };
    if (mensagem) payload.mensagem = mensagem;
    if (total !== undefined) payload.total = total;
    if (dados !== undefined) payload.dados = dados;
    return res.status(status).json(payload);
  }

  const iconeSucesso = sucesso ? '✅' : '❌';
  const classMensagem = sucesso ? 'mensagem-ok' : (status === 404 ? 'mensagem-warn' : 'mensagem-erro');
  const icone = sucesso ? '✅' : (status === 404 ? '⚠️' : '❌');

  let conteudo = '';

  if (mensagem) {
    conteudo += `<div class="mensagem-box ${classMensagem}">${icone} ${mensagem}</div>`;
  }

  if (Array.isArray(dados) && dados.length > 0 && dados[0].cargaHoraria !== undefined) {
    const titulo = extra.categoria
      ? `Cursos — ${extra.categoria}`
      : extra.nivel
        ? `Cursos — Nível ${extra.nivel}`
        : 'Cursos';
    conteudo = `
      <div class="topo">
        <a href="/cursos">← Cursos</a>
        <h1>${titulo} <span class="total-badge">${dados.length} resultado(s)</span></h1>
      </div>
      <p class="sub">Listagem retornada pelo banco de dados</p>
      ${conteudo}
      ${dados.map(cursoCard).join('')}`;
  }
  else if (dados && !Array.isArray(dados) && dados.cargaHoraria !== undefined) {
    conteudo = `
      <div class="topo">
        <a href="/cursos">← Cursos</a>
        <h1>${dados.imagem} ${dados.nome}</h1>
      </div>
      <p class="sub">Detalhes do curso #${dados.id}</p>
      ${conteudo}
      ${cursoCard(dados)}`;
  }
  else if (Array.isArray(dados) && dados.length > 0 && dados[0].especialidade !== undefined) {
    conteudo = `
      <div class="topo">
        <a href="/instrutores">← Instrutores</a>
        <h1>Instrutores <span class="total-badge">${dados.length} resultado(s)</span></h1>
      </div>
      <p class="sub">Listagem retornada pelo banco de dados</p>
      ${conteudo}
      ${dados.map(instrutorCard).join('')}`;
  }
  else if (dados && !Array.isArray(dados) && dados.especialidade !== undefined) {
    conteudo = `
      <div class="topo">
        <a href="/instrutores">← Instrutores</a>
        <h1>👨‍🏫 ${dados.nome}</h1>
      </div>
      <p class="sub">Detalhes do instrutor #${dados.id}</p>
      ${conteudo}
      ${instrutorCard(dados)}`;
  }
  else {
    conteudo = `
      <div class="topo"><h1>${iconeSucesso} ${sucesso ? 'Operação realizada' : 'Erro'}</h1></div>
      <p class="sub">${mensagem || ''}</p>
      ${conteudo}
      ${dados ? (dados.cargaHoraria ? cursoCard(dados) : instrutorCard(dados)) : ''}`;
  }

  res.status(status).send(htmlPage(mensagem || 'Resultado', conteudo));
}

module.exports = { responder };