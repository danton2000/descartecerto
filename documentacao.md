# Documentação do Projeto Final
# Documentando um Projeto Final de ADS/SPI/CD

_Danton Rodrigues_

Este documento apresenta a documentação do projeto final DescarteCerto, desenvolvido na disciplina Projeto de Desenvolvimento II dos cursos de Análise e Desenvolvimento de Sistemas, Sistemas para Internet e Ciência de Dados e Inteligência Analítica do Centro Universitário Senac-RS.

## Resumo do Projeto

O DescarteCerto é uma plataforma web voltada para conectar cidadãos a pontos de coleta de resíduos recicláveis. A solução oferece cadastro, pesquisa por cidade, visualização de detalhes e ordenação por proximidade geográfica, utilizando mapas interativos e integração com APIs públicas.

## Definição do Problema

A falta de informação sobre pontos de coleta de resíduos é um problema real para a população. Muitas pessoas não encontram locais confiáveis para descarte adequado, principalmente quando precisam saber quais materiais são aceitos e como chegar ao ponto mais próximo.

O projeto aborda essa lacuna com uma solução simples, leve e acessível, focada em facilitar o descarte correto e promover hábitos ambientais mais conscientes.

## Objetivos

### Objetivo Geral

Promover o acesso a informações sobre pontos de coleta de resíduos recicláveis, apoiando a separação correta e o descarte responsável.

### Objetivos Específicos

- desenvolver uma interface web responsiva para cadastro e consulta de pontos de coleta;
- integrar estados e cidades brasileiras a partir do IBGE;
- permitir seleção de localização diretamente no mapa;
- exibir resultados com materiais aceitos e distância até a localização do usuário;
- armazenar os registros em banco de dados local.

## Stack Tecnológica

- HTML5
- CSS3
- JavaScript Vanilla
- Node.js
- Express
- Nunjucks
- SQLite3
- Nodemon
- APIs externas: IBGE e OpenStreetMap/Nominatim

## Descrição da Solução

A aplicação é organizada em páginas renderizadas pelo Nunjucks, com os assets estáticos localizados em `public/`. A homepage apresenta uma proposta visual do projeto e permite iniciar a busca por cidade. O formulário de cadastro usa um mapa interativo para capturar latitude e longitude, além de preencher automaticamente o endereço encontrado pela API de geocodificação.

A busca de pontos por cidade retorna uma página com cards contendo informações do ponto, materiais aceitos e distância calculada quando há localização do usuário. Também existe filtro por material e modal com detalhes do local.

## Arquitetura

A arquitetura segue o padrão de aplicação web simples em camadas:

- Apresentação: views em `src/views` e estilos em `public/styles`.
- Controle: rotas definidas em `src/server.js`.
- Persistência: conexão e acesso ao banco em `src/database/db.js`.

## Fluxo de Funcionamento

1. O usuário acessa a homepage.
2. Pode buscar uma cidade ou usar a geolocalização do navegador.
3. O backend consulta os pontos cadastrados e renderiza a página de resultados.
4. Na página de resultados, o usuário pode filtrar por material e visualizar detalhes de cada ponto.
5. O formulário de cadastro coleta dados do ponto e salva no banco SQLite.

## Funcionalidades Implementadas

- busca por cidade;
- cadastro de pontos de coleta;
- seleção de localização no mapa;
- geocodificação reversa para endereço;
- modal de detalhes do ponto;
- cálculo de distância entre o usuário e os pontos;
- ordenação automática por proximidade;
- interface responsiva;
- fallback do banco em memória quando necessário.

## Validação

A validação foi feita de forma manual, testando cenários reais de uso, como:

- cadastro de novos pontos;
- busca por cidade existente;
- busca por cidade sem resultados;
- uso da geolocalização;
- filtro por material;
- abertura do modal com detalhes.

## Limitações Observadas

- o sistema ainda não possui autenticação de usuários;
- não é possível editar ou excluir registros diretamente pela interface;
- há apenas validação básica de campos obrigatórios;

## Perspectivas Futuras

- autenticação e perfil de usuários;
- painel administrativo para gestão de pontos;
- edição e remoção de registros;
- validação mais robusta de endereço e itens;
- aumento da escalabilidade e organização de rotas.

## Referências Bibliográficas

- Node.js Documentation
- Express.js Guide
- Nunjucks Documentation
- SQLite Documentation
- OpenStreetMap Nominatim API
- API do IBGE
