// // server.mjs
// import { createServer } from "node:http";

// const PORT = 3000;

// const server = createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.end("Hello New Paltz!\n");
// });

// // starts a simple http server locally on port 3000
// server.listen(PORT, "127.0.0.1", () => {
//   console.log("Listening on 127.0.0.1:3000");
// });

// run with `node server.mjs`

// Almost all Node code uses the CommonJS module system.

// The way to tell node to use the ES module system is to use the .mjs file extension.

const express = require("express");
const app = express();
const userController = require("./Controllers/users");

const PORT = 3000;

// When something comes in with the GET signature and the path is "/", we're going to send back a response of "Hello World!".

// Parameters: The first is info about the request. The second is an object with all the methods we need to create a proper response.
// An action is a function you can call from a different computer. Or every endpoint on your API is called an action.
// Get * will always get you "Hello World!".

/* Four ways to send data to the server:
1. Query string
2. Path/URL parameters
3. Headers
4. Body
*/

// Middleware
// Cores are a security feature that allows you to control who can access your server.
// * means ready to take any http message from any server.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  // If you don't call next the request will stay open and the client will hang.
  next();
});

app.use(express.json());
app.use(express.static(__dirname + "/dist"));

// Controllers
app
  .get("/", (req, res, next) => {
    res.send("Hello World");
  })
  .get("/about", (req, res, next) => {
    res.send("About Us");
  })
  .use("/api/v1/users", userController)

  .get("*", (req, res, next) => {
    res.sendFile(__dirname + "/dist/index.html");
  });

// Error Handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500).send(err);
});

console.log("Step #1");
app.listen(PORT, (err, data) => {
  console.log("Step #2");
  console.log("Server is running at http://localhost:" + PORT);
});
console.log("Step #3");

/*  Four types of async methods
    1. Node Style Callbacks
    2. Pipelines
    3. Promises
    4. Async/Await
*/

// The app object has a method called listen. We're going to listen on port 3000.

// Any time you see a number in your program, this is called a magic number. Any time you see a magic number, you should replace it with a constant. Same goes with a string.
// app.listen(PORT, () => {
//   console.log("Server is running at http://localhost:" + PORT);
// });
