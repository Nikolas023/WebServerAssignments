const model = require("../models/workouts");
const supabase = require("../models/supabase");
const express = require("express");
const router = express.Router();

// GET: Fetch all workouts
router.get("/:id/", async (req, res) => {
  try {
    const { id } = req.params; // Extract user ID from route parameters

    const { data: workouts, error } = await supabase
      .getConnection()
      .from("workouts")
      .select("*")
      .eq("id", id); // Filter workouts based on user ID

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET: Fetch a workout by the workout ID specific to that user
router.get("/:id/workoutid", async (req, res) => {
  const { workoutid } = req.params;

  try {
    const { data, error } = await supabase
      .getConnection()
      .from("workouts")
      .select("*")
      .eq("workoutid", workoutid);

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Add a new workout
router.post("/", async (req, res) => {
  const { body } = req;

  try {
    const { data, error } = await supabase
      .getConnection()
      .from("workouts")
      .insert(body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Data is null here too.
// PATCH: Update workout details

// DELETE doesn't work. Issue is that data is null because of a missing auth token from the user.
// DELETE: Remove a user by their ID

module.exports = router;
