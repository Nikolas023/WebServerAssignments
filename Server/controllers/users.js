const { json } = require("sequelize");
const supabase = require("../models/supabase");
const express = require("express");
const router = express.Router();

// POST: Create a new user (Sign up)
// api/v1/users/signup
// supabase will not let you sign up with an email which ends in gmail.com but doesn't exist. It will return a 400 error. You can make up an email like "doe@mail.com" or something that isn't an official email provider.
router.post("/signup", async (req, res) => {
  const { email, firstname, lastname, username, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Check if the email already exists
    const { data: existingUser, error: fetchError } = await supabase
      .getConnection()
      .from("users")
      .select("*")
      .eq("email", email)
      .limit(1);

    if (fetchError) {
      console.error("Error fetching user data:", fetchError.message);
      return res.status(500).json({ message: "Error fetching user data" });
    }

    if (existingUser !== null && existingUser.length > 0) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Create a new user in Supabase Auth
    const { data, error } = await supabase.getConnection().auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { user } = data;

    // Insert the new user into the 'users' table
    const { error: insertError } = await supabase
      .getConnection()
      .from("users")
      .insert({
        email,
        firstname,
        lastname,
        username,
        password,
      })
      .select("id");

    if (insertError) {
      return res.status(400).json({ message: insertError.message });
    }

    res.status(200).json({ message: "Sign up successful", user });
  } catch (err) {
    console.error("Unexpected error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET: Fetch all users
// api/v1/users
router.get("/", async (req, res) => {
  try {
    const { data: users, error } = await supabase
      .getConnection()
      .from("users")
      .select("*");

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET: Fetch a user by their ID
// api/v1/users/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .getConnection()
      .from("users")
      .select("*")
      .eq("id", id)
      .single(); // Expect only one user

    if (error) {
      console.error("Error fetching user:", error.message);
      return res.status(500).json({ message: "Error fetching user" });
    }

    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET: Get a specific user based off their username.
router.get("/username/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const { data, error } = await supabase
      .getConnection()
      .from("users")
      .select("username, email")
      .eq("username", username)
      .single(); // Expect only one user

    if (error) {
      console.error("User doesn't exist:", error.message);
      return res.status(500).json({ message: "Error fetching user" });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET: Get specific user based off email and password.
router.get("/login/:email/:password", async (req, res) => {
  const { email, password } = req.params;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Fetch the user by email and password
    const { data: user, error } = await supabase
      .getConnection()
      .from("users")
      .select("id, email, password")
      .eq("email", email)
      .eq("password", password)
      .single(); // Expect only one user

    if (error) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", id: user.id });
  } catch (err) {
    console.error("Unexpected error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET: Search users by partial username match
router.get("/autocomplete/search", async (req, res) => {
  const { username } = req.query; // Extracting from query

  console.log("Query parameter received:", username); // Debug log

  if (!username) {
    return res
      .status(400)
      .json({ message: "Username query parameter is required" });
  }

  try {
    const { data, error } = await supabase
      .getConnection()
      .from("users")
      .select("id, username, email")
      .ilike("username", `%${username}%`);

    if (error) {
      console.error("Database error:", error.message);
      return res.status(500).json({ message: "Error fetching users" });
    }

    console.log("Users found:", data); // Debug log
    res.status(200).json(data);
  } catch (err) {
    console.error("Unexpected error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// Data is null here too.
// PATCH: Update user details
// api/v1/users/:id
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, username, email } = req.body;

  try {
    const { data, error } = await supabase
      .getConnection()
      .from("users")
      .update({
        firstName,
        lastName,
        username,
        email,
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating user:", error.message);
      return res.status(500).json({ message: "Error updating user" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE: Remove a user by their email
// api/v1/users/:email
// DELETE: Remove a user by their email
// api/v1/users/:email
router.delete("/:email", async (req, res) => {
  const { email } = req.params; // User email to be deleted

  console.log(`Attempting to delete user with email: ${email}`);

  try {
    // Proceed with delete
    const { data, error } = await supabase
      .getConnection()
      .from("users")
      .delete()
      .eq("email", email);

    if (error) {
      console.error("Error deleting user:", error.message);
      return res
        .status(400)
        .json({ message: `Error deleting user: ${error.message}` });
    }

    console.log(`Delete response: ${JSON.stringify(data)}`);

    // Check if any rows were affected
    if (!data || data.length === 0) {
      console.error(
        "No rows deleted: User might not exist or was already deleted."
      );
      return res
        .status(404)
        .json({ message: "User not found or already deleted" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error:", err);
    return res
      .status(500)
      .json({ message: `Error deleting user: ${err.message}` });
  }
});

module.exports = router;
