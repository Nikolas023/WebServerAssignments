// src/client/services/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

module.exports = {
  getConnection() {
    return createClient(supabaseUrl, supabaseKey);
  },
};
