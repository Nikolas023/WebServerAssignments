// Initialize express router
const express = require("express");
const router = express.Router();
const usersController = require("../Controllers/usersController");

router
  .get("/", usersController.getAllUsers)
  .get("/:id", usersController.getUserById)
  .post("/", usersController.addUser)
  .patch("/:id", usersController.updateUser)
  .delete("/:id", usersController.deleteUser);

module.exports = router;
