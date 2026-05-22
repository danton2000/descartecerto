# Estrutura do Backend - DescarteCerto

## Arquivos Principais

src/
├── server.js # Servidor Express e rotas
└── database/
└── db.js # Conexão SQLite3

## server.js

**O que faz:** Configura o Express, define rotas e conecta com o banco de dados.

**Rotas:**
- `GET /` → Página inicial
- `GET /create-point` → Formulário de cadastro
- `POST /save-point` → Salva novo ponto no BD
- `GET /search` → Busca pontos por cidade

**Fluxo:**
1. Recebe requisição do usuário
2. Processa dados (formulário ou query)
3. Executa operação no banco de dados
4. Renderiza página HTML com resultado

## database/db.js

**O que faz:** Configura e exporta a conexão com SQLite3.

**Banco de dados:** `database.db`

**Tabela principal:** `places`

## Stack Tecnológico

- **Node.js** - Runtime
- **Express** - Framework web
- **Nunjucks** - Template engine (renderiza HTML)
- **SQLite3** - Banco de dados

## Porta

Servidor rodando em: **localhost:3000**