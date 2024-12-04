const model = require("../model/user");

// GET: Handles the retrieval of all users.
// endpoint: /api/v1/users
exports.getAllUsers = (req, res, next) => {
  model
    .getAllUsers()
    .then((x) => res.send(x))
    .catch(next);
};

// GET: Handles the retrieval of a single user.
// endpoint: /api/v1/users/:id
exports.getUserById = (req, res, next) => {
  model
    .getUserById(+req.params.id)
    .then((x) => res.send(x))
    .catch(next);
};

// POST: Handles the creation of a new user.
// endpoint: /api/v1/users
exports.addUser = (req, res, next) => {
  model
    .addUser(req.body)
    .then((x) => res.send(x))
    .catch(next);
};

// PATCH: Handles the update of an existing user.
exports.updateUser = (req, res, next) => {
  model
    .updateUser(+req.params.id, req.body)
    .then((x) => res.send(x))
    .catch(next);
};

// DELETE: Handles the deletion of an existing user.
// endpoint: /api/v1/users/:id
exports.deleteUser = (req, res, next) => {
  model
    .deleteUser(+req.params.id)
    .then((x) => res.send(x))
    .catch(next);
};
