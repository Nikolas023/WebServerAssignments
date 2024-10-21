<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item" id="mainLogo">FITNESS TRACKER</div>
      <div class="navbar-start">
        <a class="navbar-item">Home</a>
      </div>
    </div>
  </nav>
  <form class="box" @submit.prevent="handleSubmit">
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input
          class="input"
          type="email"
          v-model="email"
          placeholder="Type: idk@example.com"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input
          class="input"
          type="password"
          v-model="password"
          placeholder="Type: 1234"
        />
      </div>
    </div>
    <button class="button is-primary" type="submit">Sign in</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const handleSubmit = () => {
  if (email.value === 'idk@example.com' && password.value === '1234') {
    router.push('/next-page') // Change '/next-page' to a desired path
  } else {
    alert('Invalid credentials')
  }
}
</script>

<style scoped></style>
