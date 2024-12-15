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

// DELETE doesn't work. Issue is that data is null because of a missing auth token from the user.
// DELETE: Remove a user by their ID
// api/v1/users/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params; // User ID to be deleted
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  try {
    // Log token for debugging
    console.log("Received Token:", token);

    // Verify the token with Supabase
    const { data: session, error: sessionError } =
      await supabase.auth.api.getUser(token);
    if (sessionError) {
      console.error("Error verifying token:", sessionError.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    console.log("Authenticated User ID:", session.id);

    // Fetch the user to be deleted by the provided `id`
    const { data: existingUser, error: fetchError } = await supabase
      .getConnection()
      .from("users")
      .select("*")
      .eq("id", id) // Fetch user by ID
      .single(); // Expect one result

    if (fetchError || !existingUser) {
      console.error(
        "Error fetching user:",
        fetchError?.message || "User not found"
      );
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Existing User:", existingUser); // Log user info

    // Check if the authenticated user is the same user trying to delete their own account
    if (existingUser.usersuuid !== session.id) {
      console.error("Unauthorized attempt to delete user.");
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this user" });
    }

    // Proceed with delete
    const { data, error } = await supabase
      .getConnection()
      .from("users")
      .delete()
      .eq("usersuuid", session.id); // Use the authenticated user's UUID to delete their account

    if (error) {
      console.error("Error deleting user:", error.message);
      return res
        .status(400)
        .json({ message: `Error deleting user: ${error.message}` });
    }

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
