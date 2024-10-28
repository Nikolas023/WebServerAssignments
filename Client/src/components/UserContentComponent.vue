<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AddWorkoutComponent from './AddWorkoutComponent.vue'

// Define the Workout interface
interface Workout {
  date: string
  duration: number
  location: string
  type: string
}

const isMenuActive = ref(false)
const isAddWorkoutActive = ref(false)
const workouts = ref<Workout[]>([]) // List to store workout data
const router = useRouter()

const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value
}

const navigateToHome = () => {
  router.push('/HomeView')
}

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
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item" id="mainLogo">STRONG FITNESS</div>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="toggleMenu"
        :class="{ 'is-active': isMenuActive }"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="navbarBasicExample"
      class="navbar-menu"
      :class="{ 'is-active': isMenuActive }"
    >
      <div class="navbar-start">
        <router-link class="navbar-item" to="/UserView">
          <span class="icon">
            <i class="fas fa-home"></i>
          </span>
          My Activity
        </router-link>
        <a class="navbar-item">
          <span class="icon">
            <i class="fas fa-chart-bar"></i>
          </span>
          Statistics
        </a>
        <a class="navbar-item">
          <span class="icon">
            <i class="fas fa-users"></i>
          </span>
          Friends Activity
        </a>
        <a class="navbar-item">
          <span class="icon">
            <i class="fas fa-search"></i>
          </span>
          People Search
        </a>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <span class="icon">
              <i class="fas fa-user-shield"></i>
            </span>
            Admin
          </a>
          <div class="navbar-dropdown">
            <router-link class="navbar-item" to="/AdminUserView">
              <span class="icon">
                <i class="fas fa-user"></i>
              </span>
              User
            </router-link>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="buttons">
          <a class="button is-light" id="log-in-button" @click="navigateToHome">
            Log out
          </a>
        </div>
      </div>
    </div>
  </nav>

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
</style>
