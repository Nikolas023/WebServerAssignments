<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()
//const apiUrl = import.meta.env.VITE_API_URL

const login = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/users/login/${email.value}/${password.value}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const result = await response.json()

    if (response.ok) {
      const userId = result.id
      router.push(`/User/${userId}`)
    } else {
      alert('Error: ' + result.message)
    }
  } catch (error) {
    alert('Error: ' + error)
  }
}
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item" id="mainLogo">STRONG FITNESS</div>
      <div class="navbar-start">
        <RouterLink to="/">
          <a class="navbar-item" id="homeBtn">Home</a>
        </RouterLink>
      </div>
    </div>
  </nav>

  <form class="box" @submit.prevent="login">
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

    <button class="button is-primary" type="submit">Log in</button>
  </form>
</template>

<style scoped>
#homeBtn {
  height: 100%;
}
</style>
