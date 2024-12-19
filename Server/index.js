require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const express = require("express");
const path = require("path");
const app = express();
const userController = require("./controllers/users");
const workoutController = require("./controllers/workouts");
const friendController = require("./controllers/friends");
const PORT = process.env.PORT || 3000;

// Middleware for CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [
  "http://localhost:8080",
];
app.use((req, res, next) => {
  const origin = req.header("Origin");
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Middleware for parsing JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/v1/users", userController);
app.use("/api/v1/workouts", workoutController);
app.use("/api/v1/friends", friendController);

// Handle unknown API routes
app.use("/api", (req, res, next) => {
  res.status(404).json({ message: "API route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500).send({ message: err.message });
});

// Serve static files from the "dist" directory
app.use(express.static(path.join(__dirname, "dist")));

// Handle SPA (catch-all route for Vue Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log("Server is running at http://localhost:" + PORT);
});
