const express        = require('express');
const cursoRoutes    = require('./routes/cursoRoutes');
const instrutorRoutes = require('./routes/instrutorRoutes');

const app  = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Robson Cursos — API</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Segoe UI', sans-serif;
      background: #0f1117;
      color: #e2e8f0;
      min-height: 100vh;
      padding: 40px 20px;
    }

    .container { max-width: 860px; margin: 0 auto; }

    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 12px;
    }

    .header h1 {
      font-size: 1.8rem;
      font-weight: 700;
      color: #fff;
    }

    .badge-versao {
      background: #1e293b;
      color: #94a3b8;
      border: 1px solid #334155;
      padding: 3px 10px;
      border-radius: 999px;
      font-size: .75rem;
      font-weight: 600;
    }

    .subtitulo {
      color: #64748b;
      font-size: .95rem;
      margin-bottom: 40px;
    }

    .grupo { margin-bottom: 36px; }

    .grupo-titulo {
      font-size: .7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .1em;
      color: #475569;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid #1e293b;
    }

    .rota {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 12px 16px;
      background: #1a1f2e;
      border: 1px solid #1e293b;
      border-radius: 8px;
      margin-bottom: 8px;
      transition: border-color .15s;
    }

    .rota:hover { border-color: #334155; }

    .metodo {
      font-size: .72rem;
      font-weight: 700;
      padding: 3px 9px;
      border-radius: 4px;
      min-width: 58px;
      text-align: center;
      letter-spacing: .04em;
    }

    .get    { background: #052e16; color: #4ade80; border: 1px solid #166534; }
    .post   { background: #1e3a5f; color: #60a5fa; border: 1px solid #1d4ed8; }
    .put    { background: #422006; color: #fb923c; border: 1px solid #9a3412; }
    .delete { background: #3b0a0a; color: #f87171; border: 1px solid #991b1b; }

    .rota-path {
      font-family: 'Courier New', monospace;
      font-size: .88rem;
      color: #e2e8f0;
      flex: 1;
    }

    .rota-desc {
      font-size: .82rem;
      color: #64748b;
    }

    .footer {
      margin-top: 48px;
      padding-top: 20px;
      border-top: 1px solid #1e293b;
      font-size: .8rem;
      color: #475569;
      text-align: center;
    }

    .status-ok {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #052e16;
      color: #4ade80;
      border: 1px solid #166534;
      border-radius: 999px;
      padding: 4px 12px;
      font-size: .78rem;
      font-weight: 600;
      margin-bottom: 32px;
    }

    .dot {
      width: 7px; height: 7px;
      background: #4ade80;
      border-radius: 50%;
      animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: .3; }
    }
  </style>
</head>
<body>
  <div class="container">

    <div class="header">
      <h1>Robson Cursos API</h1>
      <span class="badge-versao">v1.0.0</span>
    </div>
    <p class="subtitulo">API REST para gerenciamento de cursos online — Node.js + MySQL</p>

    <div class="status-ok">
      <span class="dot"></span>
      Servidor rodando na porta 3001
    </div>

    <div class="grupo">
      <div class="grupo-titulo">Cursos</div>

      <div class="rota">
        <span class="metodo get">GET</span>
        <span class="rota-path">/cursos</span>
        <span class="rota-desc">Lista todos os cursos</span>
      </div>
      <div class="rota">
        <span class="metodo get">GET</span>
        <span class="rota-path">/cursos/:id</span>
        <span class="rota-desc">Busca curso por ID</span>
      </div>
      <div class="rota">
        <span class="metodo get">GET</span>
        <span class="rota-path">/cursos/categoria/:categoria</span>
        <span class="rota-desc">Filtra cursos por categoria</span>
      </div>
      <div class="rota">
        <span class="metodo get">GET</span>
        <span class="rota-path">/cursos/nivel/:nivel</span>
        <span class="rota-desc">Filtra cursos por nível</span>
      </div>
      <div class="rota">
        <span class="metodo post">POST</span>
        <span class="rota-path">/cursos</span>
        <span class="rota-desc">Cadastra novo curso</span>
      </div>
      <div class="rota">
        <span class="metodo put">PUT</span>
        <span class="rota-path">/cursos/:id</span>
        <span class="rota-desc">Atualiza um curso existente</span>
      </div>
      <div class="rota">
        <span class="metodo delete">DELETE</span>
        <span class="rota-path">/cursos/:id</span>
        <span class="rota-desc">Remove um curso</span>
      </div>
    </div>

    <div class="grupo">
      <div class="grupo-titulo">Instrutores</div>

      <div class="rota">
        <span class="metodo get">GET</span>
        <span class="rota-path">/instrutores</span>
        <span class="rota-desc">Lista todos os instrutores</span>
      </div>
      <div class="rota">
        <span class="metodo get">GET</span>
        <span class="rota-path">/instrutores/:id</span>
        <span class="rota-desc">Busca instrutor por ID</span>
      </div>
      <div class="rota">
        <span class="metodo post">POST</span>
        <span class="rota-path">/instrutores</span>
        <span class="rota-desc">Cadastra novo instrutor</span>
      </div>
      <div class="rota">
        <span class="metodo put">PUT</span>
        <span class="rota-path">/instrutores/:id</span>
        <span class="rota-desc">Atualiza um instrutor existente</span>
      </div>
      <div class="rota">
        <span class="metodo delete">DELETE</span>
        <span class="rota-path">/instrutores/:id</span>
        <span class="rota-desc">Remove um instrutor</span>
      </div>
    </div>

    <div class="footer">
      © 2025 Robson Cursos — Teste as rotas com o Postman
    </div>

  </div>
</body>
</html>`);
});

app.use('/cursos',     cursoRoutes);
app.use('/instrutores', instrutorRoutes);

app.use((req, res) => {
  res.status(404).json({ sucesso: false, mensagem: `Rota ${req.method} ${req.path} não encontrada.` });
});

app.listen(PORT, () => {
  console.log('\n╔════════════════════════════════════════════════════╗');
  console.log('║        ROBSON CURSOS — API REST                    ║');
  console.log('╚════════════════════════════════════════════════════╝');
  console.log(`\nAPI rodando em http://localhost:${PORT}`);
  console.log('\n  Rotas disponíveis:');
  console.log('  GET    http://localhost:' + PORT + '/cursos');
  console.log('  GET    http://localhost:' + PORT + '/cursos/:id');
  console.log('  POST   http://localhost:' + PORT + '/cursos');
  console.log('  PUT    http://localhost:' + PORT + '/cursos/:id');
  console.log('  DELETE http://localhost:' + PORT + '/cursos/:id');
  console.log('  GET    http://localhost:' + PORT + '/instrutores');
  console.log('  POST   http://localhost:' + PORT + '/instrutores');
  console.log('\nTeste com o Postman!\n');
});