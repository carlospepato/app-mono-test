
# Backend - Timeline Dialog

Aplicação criada para gerenciar um serviço de perfis de usuários, onde eles podem postar comentários e estes comentários podem ser curtidos por outros usuários.


## Stack utilizada

**Back-end:** Node, TypeScript, Fastify, Vitest, Prisma ORM, SQLite


## Funcionalidades

- CRUD de usuários
- Criação de posts
- Possibilidade de reagir a um post (like, unlike)
- Timeline: área logada, onde o usuário pode ver as postagens de outros usuários


## Rodando localmente

Clone o projeto

```bash
  git clone -b junior --single-branch https://github.com/carlospepato/app-mono-test.git
```

Entre no diretório do projeto

```bash
  cd packages/api-node/
```

Instale as dependências

```bash
  npm i
```

Inicie o servidor

```bash
  npm run dev
```


## Documentação da API


```http
  http://localhost:3333/docs
```
