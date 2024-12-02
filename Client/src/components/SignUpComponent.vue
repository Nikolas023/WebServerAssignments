<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const firstName = ref<string>('')
const lastName = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const password2 = ref<string>('')
const username = ref<string>('')
const router = useRouter()

const signUp = async () => {
  if (password.value !== password2.value) {
    alert('Passwords do not match')
    return
  }
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users`, {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      username: username.value,
    })
    console.log('Response:', res)
    if (res.status === 201) {
      router.push('/UserView')
    } else {
      alert('Error signing up: ' + res.statusText)
    }
  } catch (error) {
    console.error('Error creating user:', error)
    alert('Error signing up: ' + error)
  }
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
  <form class="box" @submit.prevent="signUp">
    <div class="field">
      <label class="label">First Name</label>
      <div class="control">
        <input class="input" type="name" v-model="firstName" required />
      </div>
    </div>
    <div class="field">
      <label class="label">Last Name</label>
      <div class="control">
        <input class="input" type="name" v-model="lastName" required />
      </div>
    </div>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" type="email" v-model="email" required />
      </div>
    </div>
    <div class="field">
      <label class="label">Create a Password</label>
      <div class="control">
        <input class="input" type="password" v-model="password" required />
      </div>
    </div>
    <div class="field">
      <label class="label">Confirm Password</label>
      <div class="control">
        <input class="input" type="password" v-model="password2" required />
      </div>
    </div>
    <div class="field">
      <label class="label">Username</label>
      <div class="control">
        <input class="input" type="username" v-model="username" required />
      </div>
    </div>
    <button class="button is-primary" type="submit">Sign up</button>
  </form>
</template>

<style scoped>
#homeBtn {
  height: 100%;
}
</style>
