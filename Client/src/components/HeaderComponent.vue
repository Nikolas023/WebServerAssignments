<template>
  <section class="hero">
    <div class="hero-body">
      <p class="title">Fitness Tracker</p>
      <p class="subtitle">Start your journey today and sign up!</p>
    </div>
    <div>
      <a class="button is-primary" id="sign-up-button" @click="navigateToLogin"
        ><strong>Sign up</strong></a
      >
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToLogin = () => {
  router.push('/login')
}
</script>
