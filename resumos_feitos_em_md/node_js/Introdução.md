# Introdução ao Node.js

## 🌐 O que é Node.js?

Node.js é um ambiente de execução de **JavaScript no lado do servidor**, construído sobre o **motor V8 do Google Chrome**. Ele permite que você use JavaScript para criar aplicações back-end escaláveis e performáticas.

---

## 🚀 Características principais

- **Assíncrono e orientado a eventos:** Ideal para aplicações que lidam com muitas requisições simultâneas (como APIs).
- **Single-threaded:** Usa uma única thread com um loop de eventos para lidar com múltiplas conexões.
- **Cross-platform:** Funciona em Windows, Linux e macOS.
- **Pacotes via npm:** O Node Package Manager fornece milhares de bibliotecas para acelerar o desenvolvimento.

---

## 🛠️ Casos de uso comuns

- APIs RESTful
- Sistemas em tempo real (chat, jogos multiplayer)
- Automação de tarefas com scripts
- Aplicações full-stack com frameworks como Express.js

---

## 📦 Módulos nativos importantes

| Módulo        | Função                                   |
|---------------|-------------------------------------------|
| `http`        | Criação de servidores HTTP                |
| `fs`          | Manipulação de arquivos                   |
| `path`        | Manipulação de caminhos de arquivos       |
| `os`          | Informações sobre o sistema operacional   |
| `events`      | Trabalha com eventos personalizados       |

---

## 🧪 Exemplo simples de servidor HTTP

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end('Olá, Node.js!');
});

server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
