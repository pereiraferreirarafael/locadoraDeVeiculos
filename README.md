# Hermex - Locadora de Veículos

O objetivo deste projeto é comparar uma aplicação tradicional de Single Page Application (SPA) construída com React e sua versão modernizada utilizando o recém-lançado **React Router v7 / Remix**, demonstrando as vantagens de usar estratégias avançadas de rotas, `loaders`, `actions`, e server-side rendering (SSR) ou melhorias no manuseio de dados.

## 📁 Estrutura do Projeto

A aplicação está dividida em 3 partes principais:

- **`database/`**: Contém o arquivo `server.json` que funciona como um mock da nossa API simulando o backend, com os dados de carros e categorias.
- **`react-hermex/`**: Versão da aplicação feita inicialmente em React (SPA) puramente focado no lado do cliente (Client-Side Rendering). 
- **`remix-hermex/`**: Versão refatorada e modernizada utilizando React Router v7.

## 🚀 Tecnologias Utilizadas

- **React e React DOM 19**
- **React Router v7 / Remix**
- **Tailwind CSS** para a estilização
- **Vite** como empacotador principal
- **JSON Server** para simulação de um backend com API REST
- **TypeScript** na refatoração com Remix

## 🛠 Como executar o projeto localmente

Para rodar o projeto, é necessário inicializar o backend e uma das versões do frontend de sua escolha.

### 1. Iniciando o Backend API (Mock)
No diretório raiz do projeto, instale as dependências e inicie o JSON server.
```bash
# Instale as dependências da raiz
npm install

# Inicie o JSON server (Rodará em http://localhost:3001)
npm run server
```

### 2. Iniciando a aplicação (versão Remix)
Nesta versão focamos nas melhores práticas de rotas e dados, portanto abra outro terminal:
```bash
# Acesse o diretório do projeto modernizado
cd remix-hermex

# Instale suas dependências
npm install

# Inicie o servidor de desenvolvimento (Rodará em http://localhost:5173)
npm run dev
```

### Opcional: Iniciando a versão original React SPA
Se quiser testar a aplicação no seu estado anterior:
```bash
cd react-hermex
npm install
npm run dev
```

## 🧠 Tópicos Abordados

- Evolução do React Router, abordando as novidades da v7.
- Exploração do `react-router` vs `react-router-dom`.
- Carregamento de dados (data fetching) otimizado em rotas (`loaders`).
- Transição de estado com navegações em múltiplas páginas.
- Configuração do empacotador de forma modernizada com as premissas introduzidas pelo Remix.
