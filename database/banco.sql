\echo ' '
\echo '--- Resetando banco transportadora ---'

\encoding UTF8

SET client_encoding = 'UTF8';

\set ON_ERROR_STOP on

DROP DATABASE IF EXISTS transportadora_bd;

CREATE DATABASE transportadora_bd;
\echo ' '
\echo '--- Conectando com transportadora... ---'

-- Conectando ao banco de dados recém-criado
\connect transportadora_bd;

\echo '******** BANCO CONECTADO ********'
\echo ' '
\echo '       Criando as Tabelas...     '
-- Tabela de clientes
CREATE TABLE IF NOT EXISTS clientes (
  id              SERIAL      PRIMARY KEY,
  nome            VARCHAR(255) NOT NULL,
  pedidos         VARCHAR(255) NOT NULL,
  dataCriacao     TIMESTAMP   NOT NULL DEFAULT now()
);

-- Tabela de mercadorias
CREATE TABLE IF NOT EXISTS mercadorias (
  id            SERIAL      PRIMARY KEY,
  nome          VARCHAR(255) NOT NULL,
  valor         MONEY NOT NULL,
  descricao     VARCHAR(255)
);

-- Tabela de trajetos
CREATE TABLE IF NOT EXISTS trajetos (
  id            SERIAL      PRIMARY KEY,
  cliente_id    INT NOT NULL REFERENCES clientes,
  mercadoria_id INT NOT NULL REFERENCES mercadorias,
  rua           VARCHAR(255) NOT NULL,
  bairro        VARCHAR(255) NOT NULL,
  cidade        VARCHAR(255) NOT NULL,
  numero        INT NOT NULL,
  dataAtual          DATE NOT NULL,
  dataCriacao   TIMESTAMP   NOT NULL DEFAULT now()
);
\echo ' '
\echo '--- Tabelas criadas, inserindo dados... ---'

-- Inserindo valores de exemplo na tabela Clientes
-- A coluna 'pedidos' foi preenchida com um valor de exemplo, já que é NOT NULL.
INSERT INTO clientes (nome, pedidos) VALUES
('João Silva', 'Pedido 234'),
('Maria Oliveira', 'Pedido 5678'),
('Pedro Souza', 'Pedido 9012');

-- Inserindo valores de exemplo na tabela Mercadorias
-- Corrigido para a tabela 'mercadorias' com colunas 'nome', 'valor' e 'descricao'.
INSERT INTO mercadorias (nome, valor, descricao) VALUES
('Eletrônico - Notebook', 'R$ 3500.00', 'Notebook Dell, embalagem padrão.'),
('Caixa de Produtos Leves', 'R$ 150.00', 'Itens variados, peso total 5kg.'),
('Pallet de Bebidas', 'R$ 1800.00', 'Pallet com 100 caixas de refrigerante.');

-- Inserindo valores de exemplo na tabela trajetos
-- Corrigido para a tabela 'trajetos' e colunas 'cliente_id', 'mercadoria_id', 'rua', 'bairro', 'cidade', 'numero', 'data'.
INSERT INTO trajetos (cliente_id, mercadoria_id, rua, bairro, cidade, numero, dataAtual) VALUES
-- Trajetos do João Silva (cliente_id = 1)
(1, 1, 'Rua das Flores', 'Centro', 'São Paulo', 150, '2023-11-01'),
(1, 2, 'Av. Brasil', 'Jardins', 'São Paulo', 800, '2023-11-03'),

-- Trajetos da Maria Oliveira (cliente_id = 2)
(2, 3, 'Alameda dos Anjos', 'Vila Nova', 'Rio de Janeiro', 45, '2023-11-02'),

-- Trajetos do Pedro Souza (cliente_id = 3)
(3, 1, 'Praça da Sé', 'Sé', 'Salvador', 10, '2023-11-04');

\echo '@@@@@@@ DADOS INSERIDOS COM SUCESSO @@@@@@@'
\echo ' '