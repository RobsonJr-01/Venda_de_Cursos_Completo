const cursos = [
  {
    id: 1,
    nome: "Desenvolvimento Web Full Stack",
    dataInicio: "2025-02-10",
    duracao: "6 meses",
    preco: 1299.90,
    descricao: "Aprenda a criar aplicações web completas do zero ao deploy. Domine HTML, CSS, JavaScript, Node.js, React e bancos de dados relacionais e não-relacionais. Você sairá pronto para o mercado de trabalho como desenvolvedor full stack.",
    cargaHoraria: "240 horas",
    instrutor: "Carlos Eduardo Silva",
    nivel: "Iniciante",
    vagas: 30,
    imagem: "💻",
    categoria: "Programação"
  },
  {
    id: 2,
    nome: "Data Science com Python",
    dataInicio: "2025-03-01",
    duracao: "4 meses",
    preco: 999.90,
    descricao: "Mergulhe no mundo da ciência de dados utilizando Python. Aprenda análise exploratória, machine learning, visualização de dados com Pandas, NumPy, Matplotlib, Seaborn e Scikit-learn. Projetos reais incluídos.",
    cargaHoraria: "160 horas",
    instrutor: "Ana Paula Mendes",
    nivel: "Intermediário",
    vagas: 20,
    imagem: "📊",
    categoria: "Data Science"
  },
  {
    id: 3,
    nome: "UX/UI Design Moderno",
    dataInicio: "2025-02-20",
    duracao: "3 meses",
    preco: 799.90,
    descricao: "Descubra os princípios do design centrado no usuário. Aprenda Figma, prototipagem, pesquisa de usuário, arquitetura da informação e design systems. Construa um portfólio incrível ao longo do curso.",
    cargaHoraria: "120 horas",
    instrutor: "Mariana Costa",
    nivel: "Iniciante",
    vagas: 25,
    imagem: "🎨",
    categoria: "Design"
  },
  {
    id: 4,
    nome: "DevOps & Cloud com AWS",
    dataInicio: "2025-03-15",
    duracao: "5 meses",
    preco: 1499.90,
    descricao: "Torne-se um especialista em DevOps e computação em nuvem. Aprenda Docker, Kubernetes, CI/CD, infraestrutura como código com Terraform e os principais serviços da AWS. Certificação AWS incluída no material.",
    cargaHoraria: "200 horas",
    instrutor: "Roberto Almeida",
    nivel: "Avançado",
    vagas: 15,
    imagem: "☁️",
    categoria: "Cloud"
  },
  {
    id: 5,
    nome: "Marketing Digital & Growth",
    dataInicio: "2025-02-15",
    duracao: "2 meses",
    preco: 599.90,
    descricao: "Aprenda estratégias de marketing digital que geram resultados. Domine SEO, Google Ads, Meta Ads, email marketing, funis de conversão e análise de métricas. Estratégias aplicadas em negócios reais.",
    cargaHoraria: "80 horas",
    instrutor: "Fernanda Lima",
    nivel: "Iniciante",
    vagas: 50,
    imagem: "📈",
    categoria: "Marketing"
  },
  {
    id: 6,
    nome: "Inteligência Artificial Aplicada",
    dataInicio: "2025-04-01",
    duracao: "5 meses",
    preco: 1799.90,
    descricao: "Explore o universo da inteligência artificial com foco prático. Aprenda deep learning, redes neurais, processamento de linguagem natural, visão computacional e como integrar modelos de IA em produtos reais.",
    cargaHoraria: "220 horas",
    instrutor: "Dr. Paulo Rodrigues",
    nivel: "Avançado",
    vagas: 12,
    imagem: "🤖",
    categoria: "IA"
  }
];

module.exports = cursos;
