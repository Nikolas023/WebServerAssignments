require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const { createClient } = require("@supabase/supabase-js");

console.log("Supabase URL:", process.env.SUPABASE_URL);
console.log("Supabase Key:", process.env.SUPABASE_KEY);

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

module.exports = {
  getConnection() {
    return createClient(supabaseUrl, supabaseKey);
  },
};
