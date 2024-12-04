<script setup lang="ts">
import { ref } from 'vue'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'vue-router'

const supabaseUrl = 'https://fuwrvjbxrmdciutawspf.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1d3J2amJ4cm1kY2l1dGF3c3BmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1NjE5MDQsImV4cCI6MjA0ODEzNzkwNH0.9WdAy4YMPTq0d4-SYlGLEPhf6xjU9SerBS5ZNR5Gy3s'
const supabase = createClient(supabaseUrl, supabaseKey)

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const password2 = ref('')
const username = ref('')
const router = useRouter()

const signUp = async () => {
  if (password.value !== password2.value) {
    alert('Passwords do not match')
    return
  }

  const { data, error } = await supabase.from('users').insert([
    {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value, // Ensure to hash passwords in a real-world scenario
      username: username.value,
    },
  ])

  if (error) {
    console.error('Error inserting data:', error)
    alert('Error signing up: ' + error.message)
  } else {
    console.log('Data inserted:', data)
    router.push('/UserView')
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
        <input class="input" type="text" v-model="firstName" required />
      </div>
    </div>
    <div class="field">
      <label class="label">Last Name</label>
      <div class="control">
        <input class="input" type="text" v-model="lastName" required />
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
        <input class="input" type="text" v-model="username" required />
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
