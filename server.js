const express = require('express');
const session = require('express-session');
const path = require('path');
const cursos = require('./data/cursos');

const app = express();
const PORT = 3000;

const USUARIO = {
  login: 'admin',
  senha: '1234'
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'cursos-online-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 } 
}));

function autenticado(req, res, next) {
  if (req.session && req.session.usuario) {
    return next();
  }
  res.redirect('/login?redirect=' + encodeURIComponent(req.originalUrl));
}

function htmlHead(titulo, extraCss = '') {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${titulo} | Robson Cursos</title>
  <link rel="stylesheet" href="/css/style.css">
  ${extraCss}
</head>
<body>`;
}

function htmlNav(usuario) {
  return `
<header class="header">
  <div class="container header-inner">
    <a href="/" class="logo">
      <span class="logo-icon">📚</span>
      <span class="logo-text">Robson Cursos</span>
    </a>
    <nav class="nav">
      ${usuario
        ? `<span class="nav-user">Olá, <strong>${usuario}</strong></span>
           <a href="/logout" class="btn btn-outline btn-sm">Sair</a>`
        : `<a href="/login" class="btn btn-primary btn-sm">Entrar</a>`
      }
    </nav>
  </div>
</header>`;
}

function htmlFoot() {
  return `
<footer class="footer">
  <div class="container">
    <p>© 2025 Robson Cursos — Transformando carreiras com conhecimento</p>
  </div>
</footer>
</body>
</html>`;
}

app.get('/', (req, res) => {
  const usuario = req.session.usuario || null;

  const cards = cursos.map(c => {
    const dataFormatada = new Date(c.dataInicio + 'T12:00:00').toLocaleDateString('pt-BR');
    const precoFormatado = c.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return `
    <article class="card">
      <div class="card-emoji">${c.imagem}</div>
      <div class="card-body">
        <span class="badge badge-${c.nivel.toLowerCase()}">${c.nivel}</span>
        <span class="badge badge-cat">${c.categoria}</span>
        <h3 class="card-title">${c.nome}</h3>
        <div class="card-meta">
          <span>📅 Início: ${dataFormatada}</span>
          <span>⏱ ${c.duracao}</span>
        </div>
        <div class="card-price">${precoFormatado}</div>
        <a href="/curso/${c.id}" class="btn btn-primary btn-block">Ver Detalhes →</a>
      </div>
    </article>`;
  }).join('');

  const html = `
${htmlHead('Cursos Online')}
${htmlNav(usuario)}
<main>
  <section class="hero">
    <div class="container hero-inner">
      <div class="hero-text">
        <h1>Invista no seu<br><span class="highlight">futuro profissional</span></h1>
        <p>Cursos online criados por especialistas do mercado. Aprenda no seu ritmo e conquiste novas oportunidades.</p>
        <a href="#cursos" class="btn btn-primary btn-lg">Explorar Cursos</a>
      </div>
      <div class="hero-stats">
        <div class="stat"><span class="stat-num">6</span><span class="stat-label">Cursos</span></div>
        <div class="stat"><span class="stat-num">152+</span><span class="stat-label">Vagas</span></div>
        <div class="stat"><span class="stat-num">100%</span><span class="stat-label">Online</span></div>
      </div>
    </div>
  </section>

  <section id="cursos" class="section">
    <div class="container">
      <h2 class="section-title">Cursos Disponíveis</h2>
      <p class="section-sub">Escolha o caminho certo para sua carreira</p>
      <div class="grid-cards">${cards}</div>
    </div>
  </section>
</main>
${htmlFoot()}`;

  res.send(html);
});

app.get('/login', (req, res) => {
  if (req.session.usuario) return res.redirect('/');
  const redirect = req.query.redirect || '/';
  const erro = req.query.erro || '';

  const html = `
${htmlHead('Login')}
${htmlNav(null)}
<main class="auth-main">
  <div class="auth-card">
    <div class="auth-icon">🔐</div>
    <h2 class="auth-title">Robson Cursos</h2>
    <p class="auth-sub">Entre com suas credenciais para ver os detalhes dos cursos</p>
    ${erro ? `<div class="alert alert-erro">${erro}</div>` : ''}
    <form action="/login" method="POST" class="auth-form">
      <input type="hidden" name="redirect" value="${redirect}">
      <div class="form-group">
        <label for="login">Usuário</label>
        <input type="text" id="login" name="login" placeholder="Digite seu usuário" required>
      </div>
      <div class="form-group">
        <label for="senha">Senha</label>
        <input type="password" id="senha" name="senha" placeholder="Digite sua senha" required>
      </div>
      <button type="submit" class="btn btn-primary btn-block btn-lg">Entrar na Plataforma</button>
    </form>
    <p class="auth-hint">Use: <strong>admin</strong> / <strong>1234</strong></p>
  </div>
</main>
${htmlFoot()}`;

  res.send(html);
});

app.post('/login', (req, res) => {
  const { login, senha, redirect } = req.body;
  if (login === USUARIO.login && senha === USUARIO.senha) {
    req.session.usuario = login;
    res.redirect(redirect || '/');
  } else {
    res.redirect('/login?erro=Usuário ou senha incorretos.&redirect=' + encodeURIComponent(redirect || '/'));
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

app.get('/curso/:id', autenticado, (req, res) => {
  const curso = cursos.find(c => c.id === parseInt(req.params.id));
  if (!curso) return res.redirect('/');

  const usuario = req.session.usuario;
  const dataFormatada = new Date(curso.dataInicio + 'T12:00:00').toLocaleDateString('pt-BR');
  const precoFormatado = curso.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const nivelIcone = {
    'Iniciante': '🟢',
    'Intermediário': '🟡',
    'Avançado': '🔴'
  };

  const html = `
${htmlHead(curso.nome, '<link rel="stylesheet" href="/css/detalhes.css">')}
${htmlNav(usuario)}
<main>
  <div class="container">
    <a href="/" class="back-link">← Voltar aos cursos</a>

    <div class="detalhes-grid">
      <div class="detalhes-main">
        <div class="detalhes-emoji">${curso.imagem}</div>
        <div class="detalhes-badges">
          <span class="badge badge-${curso.nivel.toLowerCase()}">${nivelIcone[curso.nivel]} ${curso.nivel}</span>
          <span class="badge badge-cat">${curso.categoria}</span>
        </div>
        <h1 class="detalhes-titulo">${curso.nome}</h1>
        <p class="detalhes-desc">${curso.descricao}</p>

        <div class="info-grid">
          <div class="info-item">
            <span class="info-icon">👨‍🏫</span>
            <div>
              <strong>Instrutor</strong>
              <span>${curso.instrutor}</span>
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon">⏰</span>
            <div>
              <strong>Carga Horária</strong>
              <span>${curso.cargaHoraria}</span>
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon">📅</span>
            <div>
              <strong>Início</strong>
              <span>${dataFormatada}</span>
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon">📆</span>
            <div>
              <strong>Duração</strong>
              <span>${curso.duracao}</span>
            </div>
          </div>
        </div>
      </div>

      <aside class="detalhes-sidebar">
        <div class="sidebar-card">
          <div class="sidebar-price" id="preco-unitario" data-preco="${curso.preco}">
            <span class="sidebar-price-valor">${precoFormatado}</span>
            <span class="sidebar-price-label">por vaga</span>
          </div>

          <div class="vagas-info">
            <span class="vagas-label">🎯 ${curso.vagas} vagas disponíveis</span>
          </div>

          <div class="qtd-selector">
            <label for="quantidade">Quantidade de vagas:</label>
            <div class="qtd-controls">
              <button type="button" id="btn-menos" class="qtd-btn">−</button>
              <input type="number" id="quantidade" value="1" min="1" max="${curso.vagas}" readonly>
              <button type="button" id="btn-mais" class="qtd-btn">+</button>
            </div>
          </div>

          <div class="total-box">
            <span class="total-label">Total:</span>
            <span class="total-valor" id="total-valor">${precoFormatado}</span>
          </div>

          <button class="btn btn-primary btn-block btn-lg" onclick="finalizarCompra()">
            Matricular Agora
          </button>

          <div id="msg-sucesso" class="msg-sucesso" style="display:none">
            ✅ Matrícula solicitada com sucesso!
          </div>
        </div>
      </aside>
    </div>
  </div>
</main>
${htmlFoot()}
<script src="/js/detalhes.js"></script>
<script>
  const PRECO_UNITARIO = ${curso.preco};
  const MAX_VAGAS = ${curso.vagas};
</script>`;

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`\nRobson Cursos rodando em http://localhost:${PORT}`);
  console.log(`Login: admin | Senha: 1234\n`);
});