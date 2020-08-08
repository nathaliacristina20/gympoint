<h1 align="center">
  <img width="300" align="center" src=".github/logo.png">
</h1>

<h3 align="center">
Plataforma de gerenciamento para academias
</h3>

<p align="center">
  <a href="#computer-sobre-o-projeto">Sobre o projeto</a> | <a href="#rocket-tecnologias">Tecnologias</a> | <a href="#books-guia-de-instalação-e-execução">Guia de instalação e execução</a> | <a href="#page_with_curl-licença">Licença</a>
</p>

## :nail_care: Preview

**Projeto em andamento**

<p align="center">
  <img width="300" alt="Gif de um loader" src=".github/spinner.gif" align="center">
</p>

## :computer: Sobre o projeto

O Gympoint é um gerenciador para academias. O backend é uma REST Api onde fornece todas as regras de negócio e persistência para as aplicações web. 

A versão web é composta pelo gerenciamento de alunos, matrículas, planos e pedidos de ajuda dos alunos. Já a versão mobile foi pensada para os alunos realizerem checkIn e solicitarem ajuda para a academia. 

Este projeto foi proposto ser desenvolvido com React.js, porém decidi fazer uma versão em Angular para entendimento de diferenças de ambos ecosistemas. 

## :rocket: Tecnologias
 
- Angular
- Node.js
- React Native

## :books: Guia de instalação e execução

### Pré-requisitos

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)
- [Mailtrap](https://mailtrap.io/)
- [PostgreSQL](https://www.postgresql.org/) 
- Emulador Mobile ou dispositivo fisíco 

<blockquote>Acesse <a href="https://react-native.rocketseat.dev">aqui</a> a documentação da Rocketseat com o passo-a-passo e erros mais comuns para montar seu ambiente Mobile.</blockquote>

### Como executar

<i>Antes de executar estes passos, você precisa ter um database no PostgreSQL ou em uma imagem do Docker.</i>

<strong>Server</strong>

- Clone o repositório ```git clone https://github.com/nathaliacristina20/gympoint.git```
- Execute ```yarn``` para instalar as dependências de todos pacotes
- Vá até o diretório ```cd packages/server```
- Copie o arquivo .env.example executando ```cp .env.example .env``` para linux ou mac e ```copy .env.example .env``` para windows
- Abra o arquivo .env e preencha com suas variáveis de ambiente
- Execute ```yarn migrations``` para rodar as migrations e ```yarn seeds``` para executar os seeds da aplicação
- Execute ```yarn dev``` para rodar o servidor

Você pode realizar requisições REST através do Insomnia

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Gympoint&uri=https%3A%2F%2Fgithub.com%2Fnathaliacristina20%2Fgympoint%2Fblob%2Ffeature%2Fmonorepo%2F.github%2FInsomnia_2020-08-07.json)

<strong>Web</strong>

- Vá para o diretório da versão web e rode ```yarn start``` para executar a aplicação
- Sua aplicação está rodando, vá até http://localhost:4200 no seu browser
- Utilize as informações abaixo para realizar o login:

user: **admin@gympoint.com** <br />
senha: **123456**

<strong>Mobile</strong>

<strong>Com um emulador</strong>

- Vá até o diretório do mobile 
- Copie o arquivo .env.example executando ```cp .env.example .env``` para linux ou mac e ```copy .env.example .env``` para windows
- Abra o arquivo .env e preencha com suas variáveis de ambiente
- Abra um dispositivo no seu emulador
- Execute ```yarn android``` ou ```yarn ios``` de acordo o sistema operacional que você deseja rodar
- Execute ```yarn start```

Pronto! Feche e abra novamente o aplicativo.

<strong>Com um dispositivo físico</strong>

<i>Certifique-se que seu dispositivo esteja com o modo desenvolver ativado.</i>

- Vá até o diretório do mobile
- Copie o arquivo .env.example executando ```cp .env.example .env``` para linux ou mac e ```copy .env.example .env``` para windows
- Abra o arquivo .env e preencha com suas variáveis de ambiente
- Conecte seu dispositivo físico em um cabo USB
- Execute ```yarn android``` ou ```yarn ios``` de acordo o sistema operacional que você deseja rodar
- Execute ```yarn start```

Pronto! Feche e abra novamente o aplicativo.

## :page_with_curl: Licença

Esse projeto está sob a licença MIT. Veja o arquivo <a href="https://github.com/nathaliacristina20/gympoint/blob/master/LICENSE">LICENSE</a> para mais detalhes.

<hr />
<p>by Nathalia Cristina :wave: <a href="https://linktr.ee/nathaliacristina20">Get in touch!</a></p>
