CREATE DATABASE IF NOT EXISTS robson_cursos
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE robson_cursos;

CREATE TABLE IF NOT EXISTS instrutores (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  nome          VARCHAR(100) NOT NULL,
  email         VARCHAR(150) NOT NULL UNIQUE,
  especialidade VARCHAR(100) NOT NULL,
  bio           TEXT,
  criado_em     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cursos (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  nome          VARCHAR(150)  NOT NULL,
  descricao     TEXT          NOT NULL,
  data_inicio   DATE          NOT NULL,
  duracao       VARCHAR(50)   NOT NULL,
  carga_horaria VARCHAR(50)   NOT NULL,
  nivel         ENUM('Iniciante','Intermediário','Avançado') NOT NULL,
  preco         DECIMAL(10,2) NOT NULL,
  vagas         INT           NOT NULL DEFAULT 0,
  categoria     VARCHAR(80)   NOT NULL,
  imagem        VARCHAR(10)   NOT NULL DEFAULT '📚',
  instrutor_id  INT,
  criado_em     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_instrutor FOREIGN KEY (instrutor_id) REFERENCES instrutores(id) ON DELETE SET NULL
);

INSERT INTO instrutores (nome, email, especialidade, bio) VALUES
  ('Carlos Eduardo Silva', 'carlos@robsoncursos.com.br', 'Desenvolvimento Web',    'Desenvolvedor full stack com 12 anos de experiência em projetos web e mobile.'),
  ('Ana Paula Mendes',     'ana@robsoncursos.com.br',    'Data Science e Python',  'Cientista de dados com passagem pela USP e empresas do setor financeiro.'),
  ('Mariana Costa',        'mariana@robsoncursos.com.br','UX/UI Design',           'Designer de produto com portfólio em startups e grandes empresas de tecnologia.'),
  ('Roberto Almeida',      'roberto@robsoncursos.com.br','DevOps e Cloud',         'Especialista AWS certificado com foco em infraestrutura ágil e Kubernetes.'),
  ('Fernanda Lima',        'fernanda@robsoncursos.com.br','Marketing Digital',     'Especialista em growth hacking e performance com mais de 8 anos no mercado.'),
  ('Dr. Paulo Rodrigues',  'paulo@robsoncursos.com.br',  'Inteligência Artificial','Doutor em Computação pela UNICAMP, pesquisador de IA e deep learning.');

INSERT INTO cursos (nome, descricao, data_inicio, duracao, carga_horaria, nivel, preco, vagas, categoria, imagem, instrutor_id) VALUES
  ('Desenvolvimento Web Full Stack',
   'Aprenda a criar aplicações web completas do zero ao deploy. Domine HTML, CSS, JavaScript, Node.js, React e bancos de dados relacionais e não-relacionais.',
   '2025-02-10', '6 meses', '240 horas', 'Iniciante', 1299.90, 30, 'Programação', '💻', 1),

  ('Data Science com Python',
   'Mergulhe no mundo da ciência de dados utilizando Python. Aprenda análise exploratória, machine learning e visualização com Pandas, NumPy e Scikit-learn.',
   '2025-03-01', '4 meses', '160 horas', 'Intermediário', 999.90, 20, 'Data Science', '📊', 2),

  ('UX/UI Design Moderno',
   'Descubra os princípios do design centrado no usuário. Aprenda Figma, prototipagem, pesquisa de usuário e design systems. Monte um portfólio incrível.',
   '2025-02-20', '3 meses', '120 horas', 'Iniciante', 799.90, 25, 'Design', '🎨', 3),

  ('DevOps & Cloud com AWS',
   'Torne-se especialista em DevOps e computação em nuvem. Aprenda Docker, Kubernetes, CI/CD e os principais serviços da AWS. Certificação AWS inclusa.',
   '2025-03-15', '5 meses', '200 horas', 'Avançado', 1499.90, 15, 'Cloud', '☁️', 4),

  ('Marketing Digital & Growth',
   'Aprenda estratégias de marketing digital que geram resultados. Domine SEO, Google Ads, Meta Ads, email marketing e funis de conversão.',
   '2025-02-15', '2 meses', '80 horas', 'Iniciante', 599.90, 50, 'Marketing', '📈', 5),

  ('Inteligência Artificial Aplicada',
   'Explore o universo da IA com foco prático. Aprenda deep learning, redes neurais, NLP e visão computacional. Integre modelos de IA em produtos reais.',
   '2025-04-01', '5 meses', '220 horas', 'Avançado', 1799.90, 12, 'IA', '🤖', 6);