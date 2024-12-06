const model = require("../model/user");
const express = require("express");
const app = express.Router();

// GET: Handles the retrieval of all users.
// endpoint: /api/v1/users
app.get("/", (req, res, next) => {
  model
    .getAllUsers()
    .then((x) => res.send(x))
    .catch(next);
});

// GET: Handles the retrieval of a single user.
// endpoint: /api/v1/users/:id
app.get("/:id", (req, res, next) => {
  model
    .getUserById(+req.params.id)
    .then((x) => res.send(x))
    .catch(next);
});

// POST: Handles the creation of a new user.
// endpoint: /api/v1/users
app.post("/", (req, res, next) => {
  model
    .addUser(req.body)
    .then((x) => res.send(x))
    .catch(next);
});

// PATCH: Handles the update of an existing user.
app.patch("/:id", (req, res, next) => {
  model
    .updateUser(+req.params.id, req.body)
    .then((x) => res.send(x))
    .catch(next);
});

// DELETE: Handles the deletion of an existing user.
// endpoint: /api/v1/users/:id
app.delete("/:id", (req, res, next) => {
  model
    .deleteUser(+req.params.id)
    .then((x) => res.send(x))
    .catch(next);
});

module.exports = app;
