// server/model/user.js
const data = require("../data/users.json");

// Gets all users.
async function getAllUsers() {
  return {
    isSuccess: true,
    data: data.items,
    total: data.items.length,
  };
}

// Gets a user by ID.
async function getUserById(id) {
  return {
    isSuccess: true,
    data: data.items.find((user) => user.id === id),
  };
}

// Adds a new user.
async function addUser(user) {
  user.id = data.items.reduce((prev, x) => (x.id > prev ? x.id : prev), 0) + 1;
  data.items.push(user);
  return {
    isSuccess: true,
    data: user,
  };
}

// Updates an existing user.
async function updateUser(id, user) {
  const userToUpdate = getUserById(id);
  Object.assign(userToUpdate, user);
  return {
    isSuccess: true,
    data: userToUpdate,
  };
}

// Removes an existing user.
async function deleteUser(id) {
  const itemIndex = data.items.findIndex((user) => user.id == id);
  if (itemIndex === -1)
    throw {
      isSuccess: false,
      message: "Item not found",
      data: id,
      status: 404,
    };
  data.items.splice(itemIndex, 1);
  return {
    isSuccess: true,
    message: "Item deleted successfully",
    data: id,
  };
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};

// const User = sequelize.define("User", {
//   firstName: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   lastName: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   userName: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
// });

// module.exports = User;
