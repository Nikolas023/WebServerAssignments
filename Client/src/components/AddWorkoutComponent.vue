<template>
  <div class="modal" :class="{ 'is-active': props.isActive }">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content">
      <!-- Your form content here -->
      <div class="box">
        <button class="delete is-pulled-right" @click="closeModal"></button>
        <h1 class="title">Add Workout</h1>
        <form @submit.prevent="handleSubmit">
          <div class="field">
            <label class="label">Date</label>
            <div class="control has-icons-left">
              <input class="input date-input" type="date" v-model="date" />
              <span class="icon is-left">
                <i class="fas fa-calendar-alt"></i>
              </span>
            </div>
          </div>
          <div class="field">
            <label class="label">Duration (minutes)</label>
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
            <label class="label">Type of Exercise</label>
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
          <div class="field">
            <div class="control">
              <button class="button is-primary" type="submit">Add</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  isActive: Boolean,
})

const emit = defineEmits(['close', 'addWorkout'])

const date = ref('')
const duration = ref(0)
const location = ref('')
const type = ref('Run')

const handleSubmit = () => {
  // Emit the workout data to the parent component
  emit('addWorkout', {
    date: date.value,
    duration: duration.value,
    location: location.value,
    type: type.value,
  })
  closeModal()
}

const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
.modal-content {
  max-width: 600px;
  margin: auto;
}
.delete.is-pulled-right {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
