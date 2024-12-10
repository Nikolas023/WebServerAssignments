<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { logInUser } from '@/services/authService' // Import from the service

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    const logIn = async () => {
      // Use the auth service to log in
      const { data, error } = await logInUser(email.value, password.value)

      if (error) {
        alert(error)
        return
      }

      // Redirect to UserView with the user's ID
      router.push({ name: 'UserView', params: { userId: data.id } })
    }

    return {
      email,
      password,
      logIn,
    }
  },
}
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item" id="mainLogo">STRONG FITNESS</div>
      <div class="navbar-start">
        <router-link class="navbar-item" id="homeBtn" to="/">Home</router-link>
      </div>
    </div>
  </nav>

  <form class="box" @submit.prevent="logIn">
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

<style scoped></style>
