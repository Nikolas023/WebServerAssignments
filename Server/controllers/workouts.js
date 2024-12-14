const supabase = require("../models/supabase");
const express = require("express");
const router = express.Router();

// When adding the date the format is YYYY-MM-DD

// GET: Fetch all workouts from a specific user
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract user ID from route parameters

    const { data: workouts, error } = await supabase
      .getConnection()
      .from("workouts")
      .select("*")
      .eq("userid", id); // Filter workouts based on user ID

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET: Fetch a workout by the workout ID specific to that user
router.get("/:id/:workoutid", async (req, res) => {
  const { id, workoutid } = req.params;

  try {
    const { data, error } = await supabase
      .getConnection()
      .from("workouts")
      .select("*")
      .eq("userid", id)
      .eq("id", workoutid); // Filter based on user ID and workout ID

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Add a new workout specific to that user
router.post("/:id", async (req, res) => {
  const { id } = req.params; // Extract user ID from URL parameters
  const { date, duration, location, type } = req.body;

  try {
    // Fetch the user id from the users table to verify existence.
    const { data: user, error: userError } = await supabase
      .getConnection()
      .from("users")
      .select("id")
      .eq("id", id)
      .single();

    if (userError) {
      return res.status(400).json({ message: userError.message });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Insert the new workout into the 'workouts' table with the userid
    const { data, error } = await supabase
      .getConnection()
      .from("workouts")
      .insert([
        {
          userid: id, // Use the user ID from the URL parameter
          date,
          duration,
          location,
          type,
        },
      ]);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH: Update workout details based on the workout ID specific to that user
router.patch("/:id/:workoutid", async (req, res) => {
  const { id, workoutid } = req.params;
  const { body } = req;

  try {
    const { data: user, error: userError } = await supabase
      .getConnection()
      .from("users")
      .select("id")
      .eq("id", id)
      .single();

    if (userError) {
      return res.status(400).json({ message: userError.message });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { data, error } = await supabase
      .getConnection()
      .from("workouts")
      .update(body)
      .eq("userid", id)
      .eq("id", workoutid); // Ensure the workout belongs to the user

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE: Remove a workout based on the workout ID specific to that user
router.delete("/:id/:workoutid", async (req, res) => {
  const { id, workoutid } = req.params;

  try {
    const { data: user, error: userError } = await supabase
      .getConnection()
      .from("users")
      .select("id")
      .eq("id", id)
      .single();

    if (userError) {
      return res.status(400).json({ message: userError.message });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { data, error } = await supabase
      .getConnection()
      .from("workouts")
      .delete()
      .eq("userid", id)
      .eq("id", workoutid); // Ensure the workout belongs to the user

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
