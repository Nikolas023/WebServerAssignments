// To execute this code, write node Server/index.js in the console.
// console.log("Hello World!");

// server.mjs
// changing it to mjs works. 
import { createServer } from 'node:http';

// You never want to use magig strings or numebrs in your program. Use const instead.
const PORT = 3000;

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

// starts a simple http server locally on port 3000
server.listen(PORT, '127.0.0.1', () => {
  // This ip address is localhost
  // Loopback, instead of network package going out of your computer, it loops back into your computer. The network messages come back to you.
  console.log('Listening on 127.0.0.1:3000');
});

// run with `node server.mjs`

