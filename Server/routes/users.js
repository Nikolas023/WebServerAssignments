// Initialize the router
const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

router
  .get("/", userController.getAllUsers)
  .get("/:id", userController.getUserById)
  .post("/", userController.addUser)
  .patch("/:id", userController.updateUser)
  .delete("/:id", userController.deleteUser);

module.exports = router;
