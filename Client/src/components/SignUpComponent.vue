<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const password2 = ref('')
const username = ref('')
const router = useRouter()

const handleSubmit = () => {
  if (
    email.value === 'idk@example.com' &&
    password.value === '1234' &&
    password2.value === '1234' &&
    username.value === 'johndoe' &&
    firstName.value === 'John' &&
    lastName.value === 'Doe'
  ) {
    router.push('/UserView')
  } else {
    alert('Invalid credentials')
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
  <form class="box" @submit.prevent="handleSubmit">
    <div class="field">
      <label class="label">First Name</label>
      <div class="control">
        <input
          class="input"
          type="name"
          v-model="firstName"
          placeholder="Type: John"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Last Name</label>
      <div class="control">
        <input
          class="input"
          type="name"
          v-model="lastName"
          placeholder="Type: Doe"
        />
      </div>
    </div>
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
      <label class="label">Create a Password</label>
      <div class="control">
        <input
          class="input"
          type="password"
          v-model="password"
          placeholder="Type: 1234"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Enter Password Again</label>
      <div class="control">
        <input
          class="input"
          type="password"
          v-model="password2"
          placeholder="Type: 1234"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Username</label>
      <div class="control">
        <input
          class="input"
          type="username"
          v-model="username"
          placeholder="Type: johndoe"
        />
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
