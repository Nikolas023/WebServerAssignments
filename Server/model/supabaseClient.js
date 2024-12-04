import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://fuwrvjbxrmdciutawspf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1d3J2amJ4cm1kY2l1dGF3c3BmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1NjE5MDQsImV4cCI6MjA0ODEzNzkwNH0.9WdAy4YMPTq0d4-SYlGLEPhf6xjU9SerBS5ZNR5Gy3s"
);
