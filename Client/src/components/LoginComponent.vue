<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginUser } from '../services/authService' // Adjust the path as needed

const email = ref('')
const password = ref('')
const router = useRouter()

const handleSubmit = async () => {
  const { data, error } = await loginUser(email.value, password.value)

  if (error) {
    console.error('Login error:', error.message)
    alert('Invalid credentials or error occurred')
    return
  }

  // Redirect to the UserView with the user's ID
  router.push({ name: 'UserView', params: { userId: data.id } })
}
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item" id="mainLogo">STRONG FITNESS</div>
      <div class="navbar-start">
        <router-link class="navbar-item" id="homeBtn" to="/HomeView"
          >Home</router-link
        >
      </div>
    </div>
  </nav>
  <form class="box" @submit.prevent="handleSubmit">
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" type="email" v-model="email" required />
      </div>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" type="password" v-model="password" required />
      </div>
    </div>
    <button class="button is-primary" type="submit">Sign in</button>
  </form>
</template>

<style scoped>
#homeBtn {
  height: 100%;
}
</style>
