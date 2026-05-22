# Levantamento de Requisitos - DescarteCerto

## Visão Geral
Plataforma web para conectar pessoas a pontos de coleta de resíduos recicláveis.

## Requisitos Funcionais

### RF-01: Página Inicial
- Exibir hero section com logo e descrição do projeto
- Botão "Pesquisar pontos de coleta" que abre modal de busca
- Modal com campo de busca por cidade

### RF-02: Cadastro de Ponto de Coleta
- Formulário com os seguintes campos:
  - Imagem (URL)
  - Nome do ponto
  - Endereço (rua, número)
  - UF (estado) - carregado dinamicamente via API IBGE
  - Cidade - carregado conforme UF selecionado
  - Items de coleta (seleção múltipla)
- Validar preenchimento dos campos obrigatórios
- Feedback visual ao selecionar itens

### RF-03: Busca de Pontos
- Pesquisar pontos de coleta por nome da cidade
- Exibir resultados em página dedicada
- Mostrar total de resultados encontrados
- Validar busca vazia

### RF-04: Persistência de Dados
- Salvar novos pontos de coleta no banco de dados
- Recuperar pontos para exibição em buscas
- Mensagem de sucesso/erro após cadastro

## Requisitos Não-Funcionais

### Tecnologia
- Backend: Node.js com Express
- Frontend: HTML5, CSS3, JavaScript Vanilla
- Template Engine: Nunjucks
- Banco de Dados: SQLite3
- API externa: IBGE (localidades)

### Performance
- Carregamento da página inicial < 2s
- Busca dinâmica sem reload de página
- Auto-preenchimento de cidades sem delay perceptível

### Usabilidade
- Design responsivo (mobile, tablet, desktop)
- Modal para busca intuitiva
- Feedback visual ao interagir (botões, seleções)
- Mensagens de erro/sucesso claras

## Fluxo Principal

1. Usuário acessa `/` (homepage)
2. Clica em "Pesquisar pontos" ou "Cadastre um ponto"
3. **Se busca:** Preenche cidade → vê resultados
4. **Se cadastro:** Preenche formulário → dados salvos → confirmação

## Integrações Externas
- **API IBGE**: Endpoints para listar estados e municípios brasileiros