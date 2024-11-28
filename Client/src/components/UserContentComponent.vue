<script setup lang="ts">
import { ref } from 'vue'
import AddWorkoutComponent from './AddWorkoutComponent.vue'

// Define the Workout interface
interface Workout {
  date: string
  duration: number
  location: string
  type: string
}

const isAddWorkoutActive = ref(false)
const workouts = ref<Workout[]>([]) // List to store workout data

const showAddWorkoutModal = () => {
  isAddWorkoutActive.value = true
}

const closeAddWorkoutModal = () => {
  isAddWorkoutActive.value = false
}

const addWorkout = (workout: Workout) => {
  workouts.value.push(workout)
}

const deleteWorkout = (index: number) => {
  workouts.value.splice(index, 1)
}
</script>

<template>
  <div class="columns is-centered">
    <div class="column is-half" id="userData">
      <div class="content">
        <h1 class="title is-1">My Activity</h1>
        <div class="button" id="workoutBtn" @click="showAddWorkoutModal">
          Add Workout
        </div>
        <div v-for="(workout, index) in workouts" :key="index" class="card">
          <div class="card-content">
            <button
              class="delete is-pulled-right"
              @click="deleteWorkout(index)"
            ></button>
            <p><strong>Date:</strong> {{ workout.date }}</p>
            <p><strong>Duration:</strong> {{ workout.duration }} minutes</p>
            <p><strong>Location:</strong> {{ workout.location }}</p>
            <p><strong>Type:</strong> {{ workout.type }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <AddWorkoutComponent
    :isActive="isAddWorkoutActive"
    @close="closeAddWorkoutModal"
    @addWorkout="addWorkout"
  />
</template>

<style scoped>
#workoutBtn {
  background-color: #bbe1fa;
  color: black;
}
.card {
  margin-top: 1em;
}
.delete.is-pulled-right {
  position: absolute;
  top: 10px;
  right: 10px;
}

.title {
  margin-top: 1rem;
}
</style>
