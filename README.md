# Hermex - Locadora de Veículos

O objetivo deste projeto é comparar uma aplicação tradicional de Single Page Application (SPA) construída com React e sua versão modernizada utilizando o recém-lançado **React Router v7 / Remix**, demonstrando as vantagens de usar estratégias avançadas de rotas, `loaders`, `actions`, e server-side rendering (SSR) ou melhorias no manuseio de dados.

## 📁 Estrutura do Projeto

A aplicação está dividida em 3 partes principais:

- **`supabase/`**: Migration SQL do backend (tabelas `category` e `car`, RLS somente leitura e dados iniciais).
- **`database/`**: `server.json` original (mock antigo), mantido apenas como referência dos dados e `car-models/` com as imagens.
- **`react-hermex/`**: Versão da aplicação feita inicialmente em React (SPA) puramente focado no lado do cliente (Client-Side Rendering). 
- **`remix-hermex/`**: Versão refatorada e modernizada utilizando React Router v7.

## 🚀 Tecnologias Utilizadas

- **React e React DOM 19**
- **React Router v7 / Remix**
- **Tailwind CSS** para a estilização
- **Vite** como empacotador principal
- **Supabase** (Postgres + API REST) como backend, com RLS somente leitura
- **TypeScript** na refatoração com Remix

## 🛠 Como executar o projeto localmente

Para rodar o projeto, é necessário inicializar o backend e uma das versões do frontend de sua escolha.

### 1. Backend (Supabase)
O backend é um projeto Supabase. Aplique `supabase/migrations/*.sql` no seu projeto e copie as variáveis dos arquivos `.env.example` para `.env` em cada app:
```bash
cp remix-hermex/.env.example remix-hermex/.env   # SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY
cp react-hermex/.env.example react-hermex/.env   # VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY
```
A chave publicável é pública por design: a segurança vem da RLS, que só permite `SELECT` para `anon`. Nunca use a `service_role` no frontend.

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
