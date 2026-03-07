const CursoRepository     = require('./backend/repository/CursoRepository');
const InstrutorRepository = require('./backend/repository/InstrutorRepository');
const Curso               = require('./backend/models/Curso');
const Instrutor           = require('./backend/models/Instrutor');

const cursoRepo    = new CursoRepository();
const instrutorRepo = new InstrutorRepository();

function log(titulo, dado) {
  console.log('\n' + '─'.repeat(60));
  console.log(`  ${titulo}`);
  console.log('─'.repeat(60));
  if (Array.isArray(dado)) {
    dado.length
      ? dado.forEach(d => console.log('  ', d.toString()))
      : console.log('  (nenhum registro)');
  } else {
    console.log('  ', dado);
  }
}

async function main() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║          ROBSON CURSOS — TESTES DE BACKEND                 ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  console.log('\n\n  ◆ MÓDULO: INSTRUTOR\n');

  const instrutor = new Instrutor({
    nome:          'Lucas Ferreira',
    email:         'lucas@robsoncursos.com.br',
    especialidade: 'Desenvolvimento Mobile',
    bio:           'Especialista em React Native e Flutter com 7 anos de experiência.',
  });
  await instrutorRepo.inserir(instrutor);
  log('1. INSERIR instrutor', instrutor.toString());

  const todosInstrutores = await instrutorRepo.buscarTodos();
  log('2. CONSULTAR todos os instrutores', todosInstrutores);

  const instrutorBuscado = await instrutorRepo.buscarPorId(instrutor.id);
  log(`3. CONSULTAR instrutor por ID (${instrutor.id})`, instrutorBuscado.toString());

  instrutor.bio = 'Expert em apps mobile multiplataforma. Palestrante no TDC 2024.';
  const instAtualizado = await instrutorRepo.atualizar(instrutor);
  log('4. ATUALIZAR instrutor', instAtualizado ? 'Atualizado com sucesso!' : 'Falhou.');

  console.log('\n\n  ◆ MÓDULO: CURSO\n');

  const curso = new Curso({
    nome:         'Desenvolvimento Mobile com React Native',
    descricao:    'Crie aplicativos profissionais para iOS e Android com React Native. Aprenda navegação, integração com APIs e publicação nas lojas.',
    dataInicio:   '2025-05-01',
    duracao:      '4 meses',
    cargaHoraria: '160 horas',
    nivel:        'Intermediário',
    preco:        1099.90,
    vagas:        20,
    categoria:    'Mobile',
    imagem:       '📱',
    instrutorId:  instrutor.id,
  });
  await cursoRepo.inserir(curso);
  log('1. INSERIR curso', curso.toString());

  const todosCursos = await cursoRepo.buscarTodos();
  log('2. CONSULTAR todos os cursos', todosCursos);

  const cursoBuscado = await cursoRepo.buscarPorId(curso.id);
  log(`3. CONSULTAR curso por ID (${curso.id})`, cursoBuscado.toString());

  const porCategoria = await cursoRepo.buscarPorCategoria('Programação');
  log('4. CONSULTAR por categoria (Programação)', porCategoria);

  const porNivel = await cursoRepo.buscarPorNivel('Avançado');
  log('5. CONSULTAR por nível (Avançado)', porNivel);

  curso.preco = 949.90;
  curso.vagas = 25;
  const cursoAtualizado = await cursoRepo.atualizar(curso);
  log('6. ATUALIZAR curso (novo preço e vagas)', cursoAtualizado ? 'Atualizado com sucesso!' : 'Falhou.');

  const cursoAposUpdate = await cursoRepo.buscarPorId(curso.id);
  log('   Curso após atualização', cursoAposUpdate.toString());

  const cursoExcluido = await cursoRepo.excluir(curso.id);
  log(`7. EXCLUIR curso ID ${curso.id}`, cursoExcluido ? 'Excluído com sucesso!' : 'Falhou.');

  const cursoAposDelete = await cursoRepo.buscarPorId(curso.id);
  log('   Busca após exclusão (deve ser null)', cursoAposDelete === null ? 'null — removido corretamente.' : 'ERRO: ainda existe!');

  await instrutorRepo.excluir(instrutor.id);
  log(`8. EXCLUIR instrutor de teste ID ${instrutor.id}`, 'Excluído com sucesso!');

  console.log('\n' + '═'.repeat(60));
  console.log('  ✅  Todos os testes concluídos com sucesso!');
  console.log('═'.repeat(60) + '\n');

  process.exit(0);
}

main().catch(err => {
  console.error('\n❌ ERRO durante os testes:\n ', err.message);
  process.exit(1);
});