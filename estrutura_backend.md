# Estrutura do Backend - DescarteCerto

## Visão Geral
O backend do DescarteCerto é responsável por receber requisições HTTP, renderizar páginas com Nunjucks, acessar o banco de dados e fornecer a comunicação entre frontend e persistência.

## Estrutura de Pastas

src/
├── server.js              # Configuração do Express, rotas e inicialização do servidor
└── database/
    └── db.js              # Conexão com SQLite3 e fallback em memória

public/
├── scripts/               # Lógica interativa do frontend
└── styles/                # Estilos da aplicação

src/views/
├── index.html             # Página inicial
├── create-point.html      # Formulário de cadastro
├── search-results.html    # Página de resultados
└── partials/              # Componentes reaproveitáveis do layout

## Componente server.js

### Funções principais
- Configura o Express.
- Define a pasta pública de assets estáticos.
- Habilita `req.body` no formato `urlencoded`.
- Configura o Nunjucks para renderizar as views.
- Cria as rotas da aplicação.
- Inicializa o servidor na porta configurada.

### Rotas implementadas

- `GET /` → renderiza a página inicial.
- `GET /create-point` → renderiza o formulário de cadastro.
- `POST /save-point` → recebe os dados do formulário e salva no banco.
- `GET /search` → busca pontos por cidade e renderiza a página de resultados.

### Fluxo de execução
1. A requisição chega ao Express.
2. A rota correspondente processa os parâmetros.
3. O backend consulta o banco SQLite.
4. A resposta é renderizada em HTML por Nunjucks.

## Componente database/db.js

### Funções principais
- Define o caminho do arquivo `database.db`.
- Cria a tabela `places` caso ela não exista.
- Exporta a conexão para uso no servidor.
- Possui fallback em memória quando o SQLite não está disponível.

### Tabela principal
- `places`
  - `id`
  - `image`
  - `name`
  - `address`
  - `address2`
  - `state`
  - `city`
  - `items`
  - `latitude`
  - `longitude`

## Fluxo de Persistência

- O formulário de cadastro envia os dados para `POST /save-point`.
- O servidor monta uma query `INSERT INTO places ...`.
- O banco grava o registro.
- A view de cadastro é renderizada novamente com confirmação.

## Stack Tecnológica

- Node.js
- Express
- Nunjucks
- SQLite3
- HTML, CSS e JavaScript Vanilla

## Observações da Implementação

- O servidor tenta iniciar em `PORT` ou em `3000`.
- Se a porta estiver ocupada, tenta a próxima disponível.
- A aplicação suporta operação local com persistência em arquivo e fallback em memória para ambiente sem `sqlite3`.

## Porta de Execução

- localhost:3000