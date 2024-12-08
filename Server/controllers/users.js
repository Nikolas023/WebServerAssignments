const model = require("../models/user");
const supabase = require("../models/supabase");
const express = require("express");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName, username } = req.body;

  try {
    const { data: testData, error: testError } = await supabase
      .getConnection()
      .from("users")
      .select("*")
      .limit(1);

    if (testError) {
      console.error("Supabase connection error:", testError.message);
      return res
        .status(500)
        .json({ message: "Error connecting to the database" });
    }

    console.log("Supabase connection successful:", testData);

    const { data, error } = await supabase.getConnection().auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { user } = data;

    const { error: insertError } = await supabase
      .getConnection()
      .from("users")
      .insert({
        firstName: firstName,
        lastName: lastName,
        username,
        email,
        password,
      });

    if (insertError) {
      return res.status(400).json({ message: insertError.message });
    }

    res.status(200).json({ message: "Sign up successful", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
