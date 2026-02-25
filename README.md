# SuperList

Aplicação fullstack para gestão de projetos e tarefas.

## Tecnologias Utilizadas

**Frontend:**
* Next.js (App Router)
* React
* Tailwind CSS
* Shadcn UI
* React Hook Form + Zod (Validação de formulários)

**Backend:**
* Node.js
* Express
* Prisma ORM
* Zod (Validação de integridade da API)
* Jest (Testes Unitários)

## Funcionalidades Principais

* CRUD completo de Projetos.
* CRUD completo de Tarefas (com atribuição de responsável e data de vencimento).
* Dashboard analítico de progresso por projeto.
* Validação rigorosa de dados no cliente e no servidor.
* Cobertura de testes unitários para os controllers.
* Pipeline de Integração Contínua (CI) configurado com GitHub Actions.

## Como Executar o Projeto

### Pré-requisitos
* Node.js (versão 18 ou superior)
* Git

### Configuração do Backend

1. Navegue até a pasta do backend:
cd backend

2. Instale as dependências:
npm install

3. Gere o cliente do Prisma e sincronize o banco de dados:
npx prisma generate
npx prisma db push

4. Inicie o servidor em modo de desenvolvimento:
npm run dev

A API estará rodando em http://localhost:3333

### Configuração do Frontend

1. Abra um novo terminal e navegue até a pasta do frontend:
cd frontend

2. Instale as dependências:
npm install

3. Inicie a aplicação web:
npm run dev

O frontend estará disponível no seu navegador em http://localhost:3000

## Testes Automatizados

O projeto conta com testes unitários no backend configurados com Jest. Para executá-los:

cd backend
npm run test
