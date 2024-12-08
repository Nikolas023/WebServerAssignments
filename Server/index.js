require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const express = require("express");
const path = require("path");
const app = express();
const userController = require("./controllers/users");
const PORT = process.env.PORT || 3000;

// Middleware for CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// Middleware for parsing JSON data
app.use(express.json());

// API Routes
app.use("/api/v1/users", userController);

// Serve static files from the "dist" directory
app.use(express.static(path.join(__dirname, "dist")));

// Handle SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500).send;
});

// Start the server
app.listen(PORT, () => {
  console.log("Server is running at http://localhost:" + PORT);
});
