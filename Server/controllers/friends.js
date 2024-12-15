const supabase = require("../models/supabase");
const express = require("express");
const router = express.Router();

// POST: Add a friend based on the user's email passed in the request body. When adding a friend the paramater in the http request is the user's id.
router.post("/:id", async (req, res) => {
  const { id } = req.params; // Extract user ID from URL parameters
  const { friendEmail } = req.body; // Get friend's email from the request body

  try {
    // Fetch the friend's user ID from the users table using the email
    const { data: friend, error: friendError } = await supabase
      .getConnection()
      .from("users")
      .select("id")
      .eq("email", friendEmail)
      .single();

    console.log("Friend object: ");

    if (friendError) {
      return res.status(400).json({ message: friendError.message });
    }

    if (!friend) {
      return res.status(404).json({ message: "Friend not found" });
    }

    // Insert the new friend into the 'friends' table
    const { data, error } = await supabase
      .getConnection()
      .from("friends")
      .insert([
        {
          userid: id,
          friend_userid: friend.id,
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

// GET: Fetch all friends for a specific user
router.get("/:id", async (req, res) => {
  const { id } = req.params; // Extract user ID from URL parameters

  try {
    const { data: friends, error } = await supabase
      .getConnection()
      .from("friends")
      .select("friend_userid")
      .eq("userid", id);

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    const friendDetails = await Promise.all(
      friends.map(async (friend) => {
        const { data, error: userError } = await supabase
          .getConnection()
          .from("users")
          .select("email, firstname, lastname")
          .eq("id", friend.friend_userid)
          .single();

        if (userError) {
          return { error: userError.message };
        }

        return data;
      })
    );

    res.status(200).json(friendDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE: Remove a friend based on the friend's user ID
router.delete("/:id/:friendid", async (req, res) => {
  const { id, friendid } = req.params;

  try {
    const { data, error } = await supabase
      .getConnection()
      .from("friends")
      .delete()
      .eq("userid", id)
      .eq("friend_userid", friendid);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
