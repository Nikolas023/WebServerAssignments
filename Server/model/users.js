// Creating the model.
// The model shouldn't know that it's using express. The model should be pure JS that only knows where it's getting the data from.
// The controller should know that it's using express. The controller should know how to send a response back to the client.
// The model knows about the database. The controller calls the model.

// copy his users.js in model.

const data = require("../data/users.json");

function getAll() {
  return data.items;
}

function getById(id) {
  return data.items.find((item) => item.id === id);
}

function add(user) {
  user.id = data.items.reduce((prev, x) => (x.id > prev ? x.id : prev), 0) + 1;
  data.items.push(user);
  return user;
}

function update(id, user) {
  const index = data.items.findIndex((item) => item.id === id);
  data.items[index] = user;
  return user;
}

function remove(id) {
  const index = data.items.findIndex((item) => item.id === id);
  data.items.splice(index, 1);
  return { success: true, message: "User deleted", id: id };
}

// Named exports
module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};
