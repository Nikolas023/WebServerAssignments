const supabase = require("../models/supabase");
const express = require("express");
const router = express.Router();

// When adding the date the format is YYYY-MM-DD

// GET: Fetch all workouts from a specific user
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

// POST: Add a new workout specific to that user
router.post("/:id", async (req, res) => {
  const { date, duration, location, exercisetype } = req.body;
  const { id } = req.params; // Extract the user ID from route parameters

  try {
    // Fetch the user's UUID from the users table
    const { data: user, error: userError } = await supabase
      .getConnection()
      .from("users")
      .select("usersuuid")
      .eq("id", id)
      .single();

    if (userError) {
      return res.status(400).json({ message: userError.message });
    }

    console.log(user.usersuuid);
    console.log(id);

    const { data, error } = await supabase
      .getConnection()
      .from("workouts")
      .insert([
        {
          id: id,
          date,
          duration,
          location,
          exercisetype,
          usersuuid: user.usersuuid,
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
router.patch("/:id/workoutid", async (req, res) => {
  const { workoutid } = req.params;
  const { body } = req;

  try {
    const { data, error } = await supabase
      .getConnection()
      .from("workouts")
      .update(body)
      .eq("workoutid", workoutid);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE: Remove a workout based on the workout ID specific to that user
router.delete("/:id/workoutid", async (req, res) => {
  const { workoutid } = req.params;

  try {
    const { data, error } = await supabase
      .getConnection()
      .from("workouts")
      .delete()
      .eq("workoutid", workoutid);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
