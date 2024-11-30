const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/users");
const { connectDB, sequelize } = require("./db");
require("dotenv").config(); // Load environment variables from .env file

// Connect to the database
connectDB();

app.use(bodyParser.json());
app.use("/api/v1/users", usersRoutes);

// Middleware for CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// Serve static files from the "dist" directory
app.use(express.static(__dirname + "/dist"));

// Define routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  res.send("About Us");
});

// Catch-all route to serve the frontend application
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.message || "Internal Server Error");
});

// Start the server
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});

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

// run with `node server.mjs`

// Almost all Node code uses the CommonJS module system.

// The way to tell node to use the ES module system is to use the .mjs file extension.
