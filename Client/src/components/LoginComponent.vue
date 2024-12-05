<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createClient } from '@supabase/supabase-js'

// Supabase client configuration
const supabaseUrl = 'https://fuwrvjbxrmdciutawspf.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1d3J2amJ4cm1kY2l1dGF3c3BmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1NjE5MDQsImV4cCI6MjA0ODEzNzkwNH0.9WdAy4YMPTq0d4-SYlGLEPhf6xjU9SerBS5ZNR5Gy3s'
const supabase = createClient(supabaseUrl, supabaseKey)

const email = ref('')
const password = ref('')
const router = useRouter()

const handleSubmit = async () => {
  // Authenticate user
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  if (error) {
    alert('Invalid credentials')
  } else {
    // Fetch user-specific data
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.value)
      .single()

    if (error) {
      console.error('Error fetching user data:', error)
      alert('Error logging in: ' + error.message)
    } else {
      // Redirect to UserView with userId parameter
      router.push({ name: 'UserView', params: { userId: data.userID } })
    }
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
