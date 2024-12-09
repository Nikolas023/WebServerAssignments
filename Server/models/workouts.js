const { get } = require("axios");

// Gets all user's workouts from the suapabse database.
async function getAllWorkouts() {
  return {
    isSuccess: true,
    data: data.items,
    total: data.items.length,
  };
}

// Gets a workout by ID.
async function getWorkoutById(id) {
  return {
    isSuccess: true,
    data: data.items.find((workout) => workout.id === id),
  };
}

// Adds a new workout.
async function addWorkout(workout) {
  workout.id =
    data.items.reduce((prev, x) => (x.id > prev ? x.id : prev), 0) + 1;
  data.items.push(workout);
  return {
    isSuccess: true,
    data: workout,
  };
}

// Updates an existing workout.
async function updateWorkout(id, workout) {
  const workoutToUpdate = getWorkoutById(id);
  Object.assign(workoutToUpdate, workout);
  return {
    isSuccess: true,
    data: workoutToUpdate,
  };
}

// Removes an existing workout.
async function deleteWorkout(id) {
  const itemIndex = data.items.findIndex((workout) => workout.id == id);
  if (itemIndex === -1)
    throw {
      isSuccess: false,
      message: "Item not found",
      data: id,
      status: 404,
    };
  data.items.splice(itemIndex, 1);
  return {
    isSuccess: true,
    message: "Item deleted successfully",
    data: id,
  };
}

module.exports = {
  getAllWorkouts,
  getWorkoutById,
  addWorkout,
  updateWorkout,
  deleteWorkout,
};
