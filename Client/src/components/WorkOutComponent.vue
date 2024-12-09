<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

interface Workout {
  id: string
  date: string
  duration: number
  location: string
  type: string
}

const route = useRoute()
const userId = route.params.id as string
const isAddWorkoutActive = ref(true)
const workouts = ref<Workout[]>([])

const showAddWorkoutModal = () => {
  isAddWorkoutActive.value = true
}

const closeAddWorkoutModal = () => {
  isAddWorkoutActive.value = false
}

const fetchWorkouts = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/workouts/${userId}`,
      {
        method: 'GET',
        credentials: 'include',
      },
    )

    const data = await response.json()
    if (data.success) {
      workouts.value = data.workouts
    } else {
      console.error('Failed to fetch workouts:', data.error)
    }
  } catch (error) {
    console.error('Error fetching workouts:', error)
  }
}

const deleteWorkout = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/workouts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const result = await response.json()
    if (result.success) {
      workouts.value = workouts.value.filter(workout => workout.id !== id)
    } else {
      throw new Error(result.error || 'Failed to delete workout')
    }
  } catch (error) {
    console.error('Error deleting workout:', error)
    alert('Error deleting workout')
  }
}

const addWorkout = async (workout: Omit<Workout, 'id'>) => {
  try {
    const response = await fetch(`http://localhost:3000/api/workouts/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ ...workout, userId }), // Include userId in the request
    })

    const result = await response.json()

    if (!result.success) {
      throw new Error(result.error || 'Failed to add workout')
    }

    workouts.value.push(result.workout) // Use server response to update local state
    closeAddWorkoutModal()
  } catch (error) {
    console.error('Error adding workout:', error)
    alert('Error adding workout')
  }
}

onMounted(() => {
  fetchWorkouts()
})
</script>

<template>
  <div class="container">
    <div class="column">
      <h1 class="title is-1">My Activity</h1>
      <div class="button" id="workoutBtn" @click="showAddWorkoutModal">
        Add Workout
      </div>
      <div v-for="workout in workouts" :key="workout.id" class="card">
        <div class="card-content">
          <button
            class="delete is-pulled-right"
            @click="deleteWorkout(workout.id)"
          ></button>
          <p><strong>Date:</strong> {{ workout.date }}</p>
          <p><strong>Duration:</strong> {{ workout.duration }} minutes</p>
          <p><strong>Location:</strong> {{ workout.location }}</p>
          <p><strong>Type:</strong> {{ workout.type }}</p>
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
  margin-top: 2rem;
}
</style>
