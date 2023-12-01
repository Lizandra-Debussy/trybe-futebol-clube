<div style="text-align: justify;">
  
# Trybe Futebol Clube (TFC)

Projeto desenvolvido durante o módulo de Back-End no curso de Desenvolvimento WEB da Trybe .

O TFC consiste em uma aplicação fullstack com uma API dedicada ao gerenciamento de informações sobre partidas e classificação de futebol. Ele foi desenvolvido com o objetivo de criar um back-end dockerizado utilizando a modelagem de dados via Sequelize.

O projeto foca em oferecer funcionalidades de adição, atualização e exclusão de dados de partidas. Utiliza Docker e Docker-compose para integrar as aplicações e viabilizar o funcionamento com um banco de dados.

## Tecnologias e Ferramentas utilizadas

* TypeScript
* NodeJS
* Sequelize ORM
* Express
* Jsonwebtoken
* MySQL
* Docker
* BCryptJS
* Eslint


<details>
<summary><strong> Estrutura do projeto</strong></summary><br />

O projeto é composto de 4 entidades importantes para sua estrutura:

1️⃣ **Banco de dados:**

  - É um container docker MySQL já configurado no docker-compose através de um serviço definido como `db`.
  - Tem o papel de fornecer dados para o serviço de _backend_.
  - Durante a execução dos testes sempre vai ser acessado pelo `sequelize` e via porta `3002` do `localhost`;
  - Você também pode conectar a um Cliente MySQL (Workbench, Beekeeper, DBeaver e etc), colocando as credenciais configuradas no docker-compose no serviço `db`.

2️⃣ **Back-end:**

 - É o ambiente onde foram feitas a maior parte das implementações exigidas;
 - Deve rodar na porta `3001`, pois o front-end faz requisições para ele nessa porta por padrão;
 - A aplicação deve ser inicializada a partir do arquivo `app/backend/src/server.ts`;

3️⃣ **Front-end:**

  - O front se comunica com serviço de back-end pela url `http://localhost:3001` através dos endpoints criados nesse projeto;

4️⃣ **Docker:**

  - O `docker-compose` tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando `npm run compose:up` ou `npm run compose:up:dev`;

</details>

## Como utilizar

* Clone o repositório:
```
  git@github.com:Lizandra-Debussy/trybe-futebol-clube.git
```
* Acesse a pasta do repositório:
```
  cd  trybe-futebol-clube
```
* Instale as dependências:
```
  npm install
```
  
</div>
