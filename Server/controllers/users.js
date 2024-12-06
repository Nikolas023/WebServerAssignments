const model = require("../model/user");
const supabase = require("../model/supabase"); // Import Supabase client
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
app.post("/", async (req, res, next) => {
  const { email, password, firstName, lastName, username } = req.body;

  try {
    // Sign up the user with Supabase
    const { data, error } = await supabase.getConnection().auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { user } = data;

    // Insert user profile into the users table
    const { error: insertError } = await supabase
      .getConnection()
      .from("users")
      .insert({
        id: user.id,
        first_name: firstName,
        last_name: lastName,
        username,
        email,
      });

    if (insertError) {
      return res.status(400).json({ message: insertError.message });
    }

    res.status(200).json({ message: "Sign up successful", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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
