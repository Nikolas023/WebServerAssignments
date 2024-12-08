const model = require("../models/user");
const supabase = require("../models/supabase");
const express = require("express");
const router = express.Router();

// POST: Create a new user (Sign up)
router.post("/signup", async (req, res) => {
  const { email, firstName, lastName, username, password } = req.body;

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
        usersuuid: user.id,
        email,
        firstName,
        lastName,
        username,
        password,
      });

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

// PATCH: Update user details
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

// DELETE: Remove a user by their ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the user by usersuuid (matching the UUID in the policy)
    const { data: existingUser, error: fetchError } = await supabase
      .getConnection()
      .from("users")
      .select("*")
      .eq("id", id) // You might use id here or usersuuid depending on your design
      .single();

    if (fetchError || !existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Existing User:", existingUser);

    // Proceed with the delete
    const { data, error } = await supabase
      .getConnection()
      .from("users")
      .delete()
      .eq("usersuuid", existingUser.usersuuid); // Delete using the usersuuid field

    if (error) {
      return res
        .status(400)
        .json({ message: `Error deleting user: ${error.message}` });
    }

    console.log("Data:", data);

    if (!data || data.length === 0) {
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
