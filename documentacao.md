# Modelo Padrão de Documentação – Projeto Final ADS/SPI/CD

## 1. Capa

* **Nome da instituição**: Senac
* **Curso**: 
* **Nome do projeto**: DescarteCerto
* **Nome dos integrantes**: Danton Rodrigues
* **Professor orientador**: 
* **Data**: 

---s

# 2. Resumo do Projeto

O DescarteCerto é uma aplicação web desenvolvida para facilitar o descarte correto de materiais recicláveis. O projeto busca resolver o problema da falta de informações sobre pontos de coleta, conectando usuários a locais adequados para o descarte. A solução proposta utiliza uma interface simples e intuitiva, com suporte a cadastro e busca de pontos de coleta. O impacto esperado é a redução do descarte inadequado e o aumento da conscientização ambiental.

---

# 3. Definição do Problema

* **Contexto do problema**: Muitas pessoas não sabem onde descartar corretamente materiais recicláveis, o que contribui para o aumento da poluição e desperdício de recursos.
* **Quem é impactado**: Comunidades locais, empresas de reciclagem e o meio ambiente.

---

# 4. Objetivos

## 4.1 Objetivo Geral

Facilitar o acesso a informações sobre pontos de coleta de materiais recicláveis, promovendo o descarte correto e a sustentabilidade.

---

# 5. Stack Tecnológico

* **Frontend**: HTML, CSS, JavaScript
* **Backend**: Node.js, Express
* **Banco de Dados**: SQLite
* **APIs**: Não aplicável
* **Ferramentas utilizadas**: Nodemon, Nunjucks
* **Justificativa das tecnologias escolhidas**: As tecnologias foram escolhidas por sua simplicidade, leveza e adequação ao escopo do projeto, permitindo um desenvolvimento rápido e eficiente.

---

# 6. Descrição da Solução

* **Funcionamento geral do sistema**: O sistema permite que usuários cadastrem e busquem pontos de coleta de materiais recicláveis.
* **Principais funcionalidades**:
  - Cadastro de pontos de coleta com informações detalhadas.
  - Busca de pontos de coleta por localização.
* **Fluxo do usuário**:
  1. O usuário acessa a página inicial.
  2. Pode cadastrar um novo ponto de coleta ou buscar pontos existentes.
  3. O sistema exibe os resultados ou confirma o cadastro.

---

# 7. Arquitetura

* **Estrutura do sistema**:
  - O backend gerencia as rotas e a comunicação com o banco de dados.
  - O frontend exibe as páginas dinâmicas utilizando Nunjucks.
* **Fluxo entre frontend, backend e banco**:
  1. O usuário interage com o frontend.
  2. O backend processa as requisições e acessa o banco de dados.
  3. O banco de dados retorna as informações necessárias ao backend, que as envia ao frontend.

---