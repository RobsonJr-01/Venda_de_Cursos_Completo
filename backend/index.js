const CursoRepository = require('./backend/repository/CursoRepository');
const Curso           = require('./backend/models/Curso');

async function main() {
  const repo = new CursoRepository();

  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║      ROBSON CURSOS — BACKEND INICIALIZADO            ║');
  console.log('╚══════════════════════════════════════════════════════╝\n');

  console.log('Buscando todos os cursos cadastrados no banco...\n');

  const cursos = await repo.buscarTodos();

  if (cursos.length === 0) {
    console.log('Nenhum curso encontrado. Execute o arquivo banco.sql primeiro.');
  } else {
    cursos.forEach(c => console.log(' ', c.toString()));
  }

  console.log(`\nTotal: ${cursos.length} curso(s) encontrado(s).`);
  console.log('\nPara rodar os testes de CRUD completos: npm test\n');

  await repo.fechar();
}

main().catch(err => {
  console.error('Erro ao inicializar:', err.message);
  process.exit(1);
});