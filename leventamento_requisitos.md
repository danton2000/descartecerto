# Levantamento de Requisitos - DescarteCerto

## Visão Geral
O DescarteCerto é uma aplicação web para auxiliar pessoas a localizar pontos de coleta de resíduos recicláveis, com foco em usabilidade, rapidez e cadastro de locais por cidade.

## Objetivo do Sistema
Facilitar a identificação de pontos de coleta com base em cidade, materiais aceitos e proximidade geográfica, promovendo o descarte correto de resíduos.

## Requisitos Funcionais

### RF-01: Página Inicial
- Exibir uma landing page com identidade visual do projeto.
- Possibilitar acesso ao cadastro de ponto de coleta.
- Permitir busca por cidade por meio de modal.
- Oferecer botão para utilizar a localização atual do usuário.

### RF-02: Cadastro de Ponto de Coleta
- Formulário com os campos:
  - nome do ponto;
  - imagem (URL);
  - estado;
  - cidade;
  - endereço e número;
  - latitude e longitude;
  - materiais aceitos.
- Carregar estados e cidades dinamicamente via API do IBGE.
- Permitir seleção da localização diretamente no mapa.
- Exibir endereço identificado automaticamente pelo OpenStreetMap/Nominatim.
- Validar campos obrigatórios antes do envio.
- Permitir seleção múltipla de itens de coleta.

### RF-03: Busca de Pontos
- Buscar pontos por cidade informada pelo usuário.
- Exibir uma página com os resultados encontrados.
- Mostrar o total de pontos retornados.
- Exibir cards com nome, materiais, endereço e distância aproximada quando houver localização do usuário.
- Permitir filtro por material na página de resultados.
- Exibir modal com detalhes do ponto selecionado.

### RF-04: Detalhamento do Local
- Ao clicar em "Ver mais detalhes", abrir um modal com:
  - cidade;
  - estado;
  - endereço;
  - número;
  - materiais aceitos;
  - mapa com marcador do ponto.

### RF-05: Persistência de Dados
- Salvar novos pontos de coleta no banco SQLite.
- Recuperar registros para busca por cidade.
- Exibir feedback de sucesso ou erro após o cadastro.
- Usar fallback em memória caso o SQLite não esteja disponível.

## Requisitos Não-Funcionais

### Tecnológicos
- Backend: Node.js com Express.
- Frontend: HTML5, CSS3 e JavaScript Vanilla.
- Template engine: Nunjucks.
- Banco de dados: SQLite3.
- Integrações externas: API do IBGE e Nominatim/OpenStreetMap.

### Usabilidade
- Interface responsiva para desktop e mobile.
- Modal intuitivo para busca por cidade.
- Feedback visual ao selecionar itens e ao interagir com o mapa.
- Mensagens claras para localização, busca e cadastro.

### Performance
- Carregamento leve da interface principal.
- Busca rápida por cidade no backend.
- Atualização de listas e ordenação de resultados sem necessidade de nova página.

## Fluxo Principal

1. O usuário acessa a página inicial.
2. Pode buscar por cidade diretamente no modal ou usar a localização atual.
3. Se a busca for realizada, o sistema redireciona para página de resultados.
4. O usuário pode filtrar por material, ver a distância e abrir detalhes do ponto.
5. Se for cadastro, o usuário preenche o formulário, seleciona o ponto no mapa e salva os dados.
6. O sistema persiste os dados e retorna confirmação de cadastro.

## Integrações Externas
- API do IBGE: consulta de estados e municípios brasileiros.
- API do Nominatim/OpenStreetMap: geocodificação reversa e busca de cidade/endereços.

## Status Atual
O projeto já contempla as principais funcionalidades de cadastro, pesquisa, detalhe de pontos e geolocalização do usuário, com layout responsivo e integração com mapas e APIs externas.