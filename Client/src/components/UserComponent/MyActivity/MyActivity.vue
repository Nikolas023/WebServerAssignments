<script setup lang="ts">
import { ref } from 'vue'
import AddWorkout from './AddWorkout.vue'

const isAddWorkoutActive = ref(false)

const showAddWorkoutModal = () => {
  isAddWorkoutActive.value = true
}

const closeAddWorkoutModal = () => {
  isAddWorkoutActive.value = false
}

const addWorkout = workout => {
  // Close modal after adding workout (you can handle workout addition logic if needed)
  closeAddWorkoutModal()
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
        <AddWorkout
          v-if="isAddWorkoutActive"
          @close="closeAddWorkoutModal"
          @addWorkout="addWorkout"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
#workoutBtn {
  background-color: #bbe1fa;
  color: black;
}
h1 {
  margin-top: 1rem;
}
</style>
