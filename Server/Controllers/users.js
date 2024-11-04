const data = require("../data/users.json");

const express = require("express");

// The Router object is a middleware and routing system built into Express.
const app = express.Router();

// All controllers must have CRUD and it's changes. Each controller can have specific functions.

app
  .get("/", (req, res) => {
    res.send(data.items);
  })

  // Read function
  .get("/:id", (req, res) => {
    const id = req.params.id;
    // The below function is a predicate function. This returns yes or no. This function is called once for every single item in items.
    const user = data.items.find((user) => user.id === id);
    res.send(user);
  })

  // Every controller should start with CRUD then have some functions specific to that controller.

  // Create function
  .post("/", (req, res) => {
    // body is when we send a body to the server. We're going to send a JSON object.
    const user = req.body;
    // The ? operator is called the ternary operator. It's a shorthand for an if statement. Most operators operate on one or two values, here we're going to operate on three values. It's like an if statement with a return value. If the first expression is not true return the third expression.
    // This is how you write max without having a max function.
    user.id =
      data.items.reduce((prev, x) => (x.id > prev ? x.id : prev), 0) + 1;
    data.items.push(user);
    res.send(user);
  })

  // Update function. Patch is when you're trying to edit information. Put is replace, patch is edit.
  .patch("/:id", (req, res) => {
    const id = req.params.id;
    const user = req.body;
    const index = data.items.findIndex((user) => user.id === id);
    data.items[index] = user;
    res.send(user);
  })

  // Delete function
  .delete("/:id", (req, res) => {
    const id = req.params.id;
    const userIndex = data.items.findIndex((user) => user.id === id);
    data.items.splice(userIndex, 1);
    res.send({
      success: true,
      message: "User deleted",
      id: id,
    });
  });

// Once we created all these actions on our pipeline, we need to export them. We're going to export the app object. We're going to import this object in our index.js file (main file).

module.exports = app;
