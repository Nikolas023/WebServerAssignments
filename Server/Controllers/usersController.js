const fs = require("fs");
const path = require("path");
const dataFilePath = path.join(__dirname, "../data/users.json");
const User = require("../model/user");

const readData = () => {
  const data = fs.readFileSync(dataFilePath, "utf8");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// GET: Handles the retrieval of all users.
// endpoint: /api/v1/users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json({ isSuccess: true, data: users });
  } catch (err) {
    next(err);
  }
};

// GET: Handles the retrieval of a single user.
// endpoint: /api/v1/users/:id
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json({ isSuccess: !!user, data: user });
  } catch (err) {
    next(err);
  }
};

// POST: Handles the creation of a new user.
// endpoint: /api/v1/users
exports.addUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json({ isSuccess: true, data: user });
  } catch (err) {
    next(err);
  }
};

// PUT: Handles the update of an existing user.
// endpoint: /api/v1/users/:id
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.json({ isSuccess: false, message: "User not found" });
    }
    await user.update(req.body);
    res.json({ isSuccess: true, data: user });
  } catch (err) {
    next(err);
  }
};

// DELETE: Handles the deletion of an existing user.
// endpoint: /api/v1/users/:id
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.json({ isSuccess: false, message: "User not found" });
    }
    await user.destroy();
    res.json({ isSuccess: true, message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};
