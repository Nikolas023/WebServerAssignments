// src/client/services/supabaseClient.js
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

module.exports = {
  getConnection() {
    return createClient(supabaseUrl, supabaseKey);
  },
};
