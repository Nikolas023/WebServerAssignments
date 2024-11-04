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
app
  .get("/", (req, res) => {
    res.send("Hello World!");
  })
  .get("/about", (req, res) => {
    res.send("About Us");
  })
  // .get("/contact/:name", (req, res) => {
  //   res.send(name, req.params.name, phone, "555-555-5555");
  // });
  .use("/users", userController);

// The app object has a method called listen. We're going to listen on port 3000.

// Any time you see a number in your program, this is called a magic number. Any time you see a magic number, you should replace it with a constant. Same goes with a string.
app.listen(PORT, () => {
  console.log("Server is running at http://localhost:" + PORT);
});
