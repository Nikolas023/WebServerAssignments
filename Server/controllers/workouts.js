const supabase = require("../models/supabase");

class WorkoutController {
  static async getWorkoutsByUser(userId) {
    const { data, error } = await supabase
      .from("workouts")
      .select("*")
      .eq("userId", userId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  static async addWorkout(workout) {
    const { data, error } = await supabase.from("workouts").insert([workout]);

    if (error) {
      throw new Error(error.message);
    }

    return data[0];
  }
}

module.exports = WorkoutController;
