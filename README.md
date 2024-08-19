
# Teste Dialog para Desenvolvedor Fullstack

## Descrição do Projeto

Este projeto é uma aplicação web que permite aos usuários interagir através de postagens e reações. A aplicação oferece:

**Timeline de Postagens:**

Os usuários podem visualizar uma lista de postagens, criar novas publicações e reagir (curtir) as postagens de outros usuários.

**Perfil do Usuário:**

Os usuários têm acesso a uma página de perfil onde podem editar suas informações pessoais, como nome e e-mail.

### Funcionalidades adicionais

**Autenticação:**

Para acessar a aplicação, os usuários devem se registrar e fazer login. Após o login, a aplicação utiliza um token de autenticação para validar todas as ações do usuário.

**Segurança:**

O token de autenticação é verificado a cada ação para garantir a segurança e integridade das interações dentro da aplicação.



## Stack utilizada

**Back-end:** Node, TypeScript, Fastify, Vitest, Prisma ORM, SQLite

**Front-end:** React, TypeScript, TailwindCSS




## Rodando localmente

Clone o projeto

```bash
  git clone -b junior --single-branch https://github.com/carlospepato/app-mono-test.git
```

Entre no diretório do projeto

```bash
  cd app-mono-test
```

Instale as dependências

```bash
  npm run install:all
```

Inicie a aplicação

```bash
  npm run dev
```


## Configuração de Variáveis de Ambiente

Após clonar o repositório, você precisará criar os arquivos `.env` necessários para cada serviço:

**Back-end:**

    - Caminho: `packages/api-node/.env`
    - exemplo: Use o arquivo `packages/api-node/.env.example` como base.
    - Variáveis necessárias:
        - `DATABASE_URL`: URL do banco de dados.
        - `JWT_SECRET`: Segredo para JWT.
        - `PORT`: Porta em que a API deve rodar.

**Front-end:**

    - Caminho: `packages/frontend-react/.env`
    - Exemplo: Use o arquivo `packages/frontend-react/.env.example` como base.
    - Variáveis necessárias:
        - `REACT_APP_API_URL`: URL da API.
## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm run test
```


## Documentação da API


```http
  http://localhost:3333/docs
```
