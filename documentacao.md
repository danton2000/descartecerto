<<<<<<< HEAD
# Documentação do Projeto Final
=======
# Documentando um Projeto Final de ADS/SPI/CD
>>>>>>> ac07923 (subindo nova doc)

_Danton Rodrigues_

Este documento apresenta a documentação do projeto final DescarteCerto, desenvolvido na disciplina Projeto de Desenvolvimento II dos cursos de Análise e Desenvolvimento de Sistemas, Sistemas para Internet e Ciência de Dados e Inteligência Analítica do Centro Universitário Senac-RS.

## Resumo do Projeto

O DescarteCerto é uma plataforma web que resolve a dificuldade dos cidadãos em encontrar pontos de coleta para resíduos recicláveis nas cidades brasileiras. O problema é relevante porque o descarte incorreto gera poluição, sobrecarrega aterros e reduz a reciclagem de materiais úteis. A solução oferece cadastro de pontos de coleta, busca por cidade e visualização dos locais cadastrados, com um fluxo simples e responsivo. Como consequência, espera-se incentivar a destinação correta de resíduos e apoiar a promoção de hábitos ambientais mais sustentáveis.

## Definição do Problema

A falta de informação sobre locais de coleta de recicláveis é um problema prático para a população urbana. Muitos usuários não têm acesso a um canal confiável que reúna pontos de descarte adequados, o que leva ao descarte indevido de materiais como eletrônicos, óleo de cozinha, pilhas e papéis.

O projeto se baseia em dados de discovery que revelam:

* necessidade de transparência na localização de pontos de coleta;
* dificuldade de encontrar locais que aceitam itens específicos;
* ausência de um repositório simples e gratuito para pequenos geradores de resíduos.

A pesquisa de projetos correlatos indica soluções de mapas de coleta e guias de recicláveis, mas poucos oferecem cadastro colaborativo e busca por município em uma interface leve e de fácil uso.

### Pesquisa e comparação

| Característica | DescarteCerto | Aplicativos de mapas genéricos | Sites institucionais de reciclagem |
| --- | --- | --- | --- |
| Cadastro colaborativo | Sim | Não | Não |
| Busca por cidade | Sim | Sim, mas geral | Limitado |
| Classificação de itens recicláveis | Sim | Parcial | Parcial |
| Interface leve | Sim | Geralmente pesada | Simples |
| Uso offline parcial | Não | Não | Não |

Este comparativo mostra o diferencial do DescarteCerto em oferecer uma experiência de cadastro e busca focada em pontos de coleta de resíduos recicláveis.

## Objetivos

### Objetivo Geral

<<<<<<< HEAD
* **Estrutura do sistema**:
  - O backend gerencia as rotas e a comunicação com o banco de dados.
  - O frontend exibe as páginas dinâmicas utilizando Nunjucks.
* **Fluxo entre frontend, backend e banco**:
  - O usuário interage com o frontend.
  - O backend processa as requisições e acessa o banco de dados.
  - O banco de dados retorna as informações necessárias ao backend, que as envia ao frontend.
=======
Facilitar o acesso da população a informações sobre pontos de coleta de resíduos recicláveis, promovendo o descarte correto e contribuindo para a sustentabilidade.

### Objetivos Específicos

* Desenvolver uma interface web responsiva para cadastro e pesquisa de locais de coleta.
* Integrar a aplicação com dados de estados e cidades do Brasil para tornar o cadastro mais preciso.
* Permitir o registro de diferentes tipos de materiais recicláveis aceitos em cada ponto.
* Armazenar as informações em banco de dados para recuperação rápida e segura.
* Exibir resultados de busca com contagem de pontos encontrados e dados completos do local.

## Stack Tecnológico

O projeto utiliza tecnologias modernas e apropriadas para um protótipo de aplicação web.

* **HTML5** – marcação de páginas e formulários.
* **CSS3** – estilos responsivos para desktop e mobile.
* **JavaScript Vanilla** – interações no frontend, seleção de itens e preenchimento dinâmico de cidades.
* **Node.js** – execução do servidor.
* **Express** – framework web para roteamento e tratamento de requisições.
* **Nunjucks** – engine de templates para renderização de páginas HTML.
* **SQLite** – banco de dados leve e embarcado, adequado para protótipos e aplicações pequenas.
* **Nodemon** – ferramenta de desenvolvimento para reiniciar o servidor automaticamente.

### Justificativa das escolhas

Node.js e Express foram escolhidos pela facilidade de criar um backend leve e escalável com poucos arquivos. Nunjucks permite separar a lógica do servidor das páginas HTML, deixando o frontend mais organizado. SQLite é ideal para este projeto porque não exige instalação de servidor adicional, facilitando a execução local e o desenvolvimento rápido.

## Descrição da Solução

O DescarteCerto é organizado como uma aplicação web com três principais funcionalidades:

* cadastro de pontos de coleta;
* busca de pontos por cidade;
* exibição de resultados com detalhes do endereço e materiais aceitos.

Ao acessar a página inicial, o usuário encontra informações sobre o projeto e dois caminhos principais: cadastrar um novo ponto de coleta ou buscar pontos existentes. O formulário de cadastro solicita nome, imagem, endereço, estado, cidade e itens coletados. Os estados e cidades são preenchidos dinamicamente no frontend usando dados do IBGE, tornando o cadastro mais preciso e reduzindo erros de digitação.

O backend processa o formulário em `POST /save-point`, insere os dados na tabela `places` do banco SQLite e retorna a mesma página de cadastro com confirmação de sucesso. A busca é feita em `GET /search`, onde o parâmetro `search` filtra pontos pelo campo `city` usando uma consulta SQL com `LIKE`.

As telas principais do sistema incluem:

* homepage com modal de busca por cidade;
* formulário `create-point.html` para cadastro de locais;
* `search-results.html` para exibir os pontos encontrados.

O design valoriza usabilidade, com feedback visual ao selecionar itens e mensagens claras de sucesso ou erro.

## Arquitetura

A arquitetura do DescarteCerto segue uma estrutura simples em camadas:

* **Apresentação** – páginas HTML renderizadas pelo Nunjucks em `src/views` e `public` para assets estáticos.
* **Controle** – rotas definidas em `src/server.js` tratam requisições HTTP e coordenam os dados.
* **Persistência** – `src/database/db.js` gerencia a conexão com o banco SQLite e a tabela `places`.

Artefatos produzidos durante o desenvolvimento:

* levantamento de requisitos funcionais e não-funcionais;
* estrutura técnica do backend;
* fluxos de cadastro e busca do usuário;
* protótipos de interface baseados em `create-point.html` e `search-results.html`;

A comunicação entre as camadas é direta: o frontend envia requisições ao servidor Express, que executa operações SQL no SQLite e renderiza as páginas de resposta.

## Validação

### Estratégia

A validação do sistema considerou três dimensões:

* funcionalidade – verificar cadastro de pontos e pesquisa por cidade;
* usabilidade – confirmar se os formulários e resultados são claros e responsivos;
* integridade dos dados – garantir que campos obrigatórios sejam preenchidos.

Testes manuais foram realizados usando cenários reais de uso: cadastro de pontos com diferentes tipos de resíduos, busca por cidades existentes e busca por cidades sem resultados.

### Consolidação dos Dados Coletados

Os resultados de validação mostraram que:

* o cadastro salva os dados corretamente no banco;
* a busca retorna os pontos de coleta quando a cidade existe;
* a interface trata o caso de pesquisa vazia exibindo `0 pontos encontrados`.

A análise indicou que a solução atende aos objetivos básicos do projeto, mesmo sendo um protótipo técnico com potencial para melhorias.

## Conclusões

O DescarteCerto alcançou o objetivo de oferecer uma solução prática para localizar pontos de coleta de reciclagem. A aplicação demonstra como uma plataforma leve pode apoiar o descarte correto de resíduos e aumentar a conscientização ambiental.

Limitações observadas:

* o sistema não possui autenticação de usuários;
* o cadastro de pontos não valida itens duplicados nem geolocalização;
* a arquitetura ainda não é preparada para alta escala.

Perspectivas futuras:

* incluir login e perfil de usuários;
* adicionar validação de endereço com API de mapas;
* permitir edição e exclusão de pontos de coleta;
* criar um painel administrativo para gestão dos registros.

## Referências Bibliográficas

* Documentação oficial Node.js. https://nodejs.org/
* Express.js Guide. https://expressjs.com/
* Nunjucks documentation. https://mozilla.github.io/nunjucks/
* SQLite Documentation. https://www.sqlite.org/docs.html
>>>>>>> ac07923 (subindo nova doc)
