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
              <input
                class="input date-input"
                type="date"
                v-model="date"
                ref="dateInput"
              />
              <span class="icon is-left" @click="triggerDatePicker">
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
import { ref, defineProps, defineEmits, onMounted } from 'vue'

const props = defineProps({
  isActive: Boolean,
})

const emit = defineEmits(['close', 'addWorkout'])

const date = ref('')
const duration = ref(0)
const location = ref('')
const type = ref('Run')

const dateInput = ref<HTMLInputElement | null>(null)

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

const triggerDatePicker = () => {
  if (dateInput.value) {
    dateInput.value.showPicker()
  }
}

onMounted(() => {
  // Ensure the date input is focused when the icon is clicked
  const dateInputElement = dateInput.value
  if (dateInputElement) {
    dateInputElement.addEventListener('click', event => {
      event.stopPropagation()
    })
  }
})
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
.date-input {
  position: relative;
  padding-left: 2.5em; /* Adjust padding to make space for the icon */
}
.date-input::-webkit-calendar-picker-indicator {
  opacity: 0; /* Hide the native calendar icon */
  pointer-events: none; /* Ensure the native icon does not interfere */
}
.icon.is-left {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: auto; /* Ensure the icon is clickable */
  color: white; /* Set the color of the custom calendar icon */
  cursor: pointer; /* Change cursor to pointer to indicate it's clickable */
}

.box {
  position: relative;
}
</style>
