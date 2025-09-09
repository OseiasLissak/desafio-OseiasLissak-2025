# 🐾 Abrigo de Animais

Bem-vindo ao sistema de adoção do Abrigo de Animais! Este projeto simula a lógica de adoção de animais com base nas preferências de brinquedos dos adotantes e nas regras do abrigo.

## 🚀 Como rodar o projeto

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/) instalado na sua máquina.

### 2. Instalar dependências

No terminal, execute:

```sh
npm install
```

### 3. Rodar o sistema interativo

Para executar o sistema e testar diferentes cenários de adoção, rode:

```sh
node executa.js
```

Você poderá informar os brinquedos de cada pessoa e a ordem dos animais para adoção. O sistema mostrará o resultado conforme as regras do abrigo.

### 4. Rodar os testes automáticos

Para validar sua solução com os testes já criados, execute:

```sh
npm test
```

Os testes estão em [`src/abrigo-animais.test.js`](src/abrigo-animais.test.js) e cobrem casos de sucesso e erro.

## 📝 Regras de adoção

- O animal vai para quem mostrar todos seus brinquedos favoritos na ordem desejada.
- Gatos não dividem seus brinquedos.
- Se ambas as pessoas forem aptas, o animal permanece no abrigo.
- Ninguém pode adotar mais de três animais.
- Loco (jabuti) não se importa com a ordem dos brinquedos, desde que tenha outro animal como companhia.

## 📂 Estrutura do projeto

- [`src/abrigo-animais.js`](src/abrigo-animais.js): lógica principal do abrigo.
- [`executa.js`](executa.js): interface interativa via terminal.
- [`src/abrigo-animais.test.js`](src/abrigo-animais.test.js): testes automáticos.

## 💡 Exemplo de uso

```js
new AbrigoAnimais().encontraPessoas(
  'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo'
);
// Saída: { lista: ['Fofo - abrigo', 'Rex - pessoa 1'] }
```

## 🐶🐱🐢 Sobre

Este projeto é um desafio de lógica para simular a adoção responsável de animais. Divirta-se testando diferentes combinações e regras!

---

Se todos os passos forem seguidos corretamente, você terá um repositório como o da figura abaixo (lembrando que é permitido criar mais arquivos), onde `seuUsername` é o seu usuário do GitHub, que você informou no questionário da Gupy.

![Exemplo de repositório](estrutura-repositorio.png)
# desafio-OseiasLissak-2025
