<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userId = (route.params as { id: string }).id // Extract userId from the URL

const date = ref('')
const duration = ref('')
const location = ref('')
const type = ref('Run')
const emit = defineEmits(['close', 'addWorkout'])

const apiUrl = import.meta.env.VITE_API_URL

const handleSubmit = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/v1/workouts/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: date.value,
        duration: duration.value,
        location: location.value,
        type: type.value,
      }),
    })

    const result = await response.json()

    if (response.ok) {
      emit('addWorkout', result)
    } else {
      alert('Error: ' + result.message)
    }
  } catch (error) {
    alert('Error: ' + error)
  }

  closeModal()
}

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content">
      <!-- Your form for adding a workout -->
      <div class="box">
        <h1 class="title">Add Workout</h1>
        <div class="field">
          <label class="label">Date</label>
          <div class="control has-icons-left">
            <input class="input" type="date" v-model="date" />
          </div>
        </div>
        <div class="field">
          <label class="label">Duration in minutes</label>
          <div class="control">
            <input class="input" type="number" v-model="duration" />
          </div>
        </div>
        <div class="field">
          <label class="label">Location</label>
          <div class="control">
            <input class="input" type="text" v-model="location" />
          </div>
        </div>
        <div class="field">
          <label class="label">Type</label>
          <div class="control">
            <div class="select">
              <select v-model="type">
                <option>Run</option>
                <option>Bike</option>
                <option>Walk</option>
                <option>Cardio</option>
                <option>Strength</option>
              </select>
            </div>
          </div>
        </div>
        <div class="buttons">
          <button class="button is-primary" @click="handleSubmit">Add</button>
          <button class="button" @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>
    <button
      class="modal-close is-large"
      @click="closeModal"
      aria-label="close"
    ></button>
  </div>
</template>
