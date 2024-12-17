<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AddWorkout from './AddWorkout.vue'

const isAddWorkoutActive = ref(false)
const workouts = ref<Workout[]>([])

interface Workout {
  date: string
  duration: string
  location: string
  type: string
}

const fetchWorkouts = async () => {
  const userId = 1 // Replace with the actual user ID

  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/workouts/${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const result = await response.json()

    if (response.ok) {
      workouts.value = result
    } else {
      alert('Error: ' + result.message)
    }
  } catch (error) {
    alert('Error: ' + error)
  }
}

const showAddWorkoutModal = () => {
  isAddWorkoutActive.value = true
}

const closeAddWorkoutModal = () => {
  isAddWorkoutActive.value = false
}

const addWorkout = (workout: Workout) => {
  workouts.value.push(workout)
  closeAddWorkoutModal()
}

const deleteWorkout = async workoutId => {
  const userId = 1 // Replace with the actual user ID

  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/workouts/${userId}/${workoutId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (response.ok) {
      workouts.value = workouts.value.filter(
        workout => workout.id !== workoutId,
      )
    } else {
      const result = await response.json()
      alert('Error: ' + result.message)
    }
  } catch (error) {
    alert('Error: ' + error)
  }
}

onMounted(fetchWorkouts)
</script>

<template>
  <div class="columns is-centered">
    <div class="column is-half" id="userData">
      <div class="content">
        <h1 class="title is-1">My Activity</h1>
        <div class="button" id="workoutBtn" @click="showAddWorkoutModal">
          Add Workout
        </div>
        <AddWorkout
          v-if="isAddWorkoutActive"
          @close="closeAddWorkoutModal"
          @addWorkout="addWorkout"
        />
        <div v-for="workout in workouts" :key="workout.id" class="card">
          <div class="card-content">
            <p><strong>Date:</strong> {{ workout.date }}</p>
            <p><strong>Duration:</strong> {{ workout.duration }}</p>
            <p><strong>Location:</strong> {{ workout.location }}</p>
            <p><strong>Type:</strong> {{ workout.type }}</p>
            <button @click="deleteWorkout(workout.id)" class="button is-danger">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#workoutBtn {
  background-color: #bbe1fa;
  color: black;
}
.card {
  margin-top: 1em;
}
h1 {
  margin-top: 1rem;
}
</style>
