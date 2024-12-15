<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  const response = await fetch('http://localhost:3000/api/v1/users/:id', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  })

  if (response.ok) {
    const data = await response.json()
    localStorage.setItem('token', data.token)
    router.push(`/User/${data.user.id}`)
  } else {
    alert('Login failed')
    console.error('Login failed')
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
        <input class="input" type="email" required />
      </div>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" type="password" required />
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
