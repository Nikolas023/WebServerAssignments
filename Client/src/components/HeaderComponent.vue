<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToSignUp = () => {
  router.push({ name: 'SignUp' })
}

const navigateToLogin = () => {
  router.push({ name: 'Login' })
}
</script>

<template>
  <section class="hero">
    <div class="hero-body">
      <p class="title">STRONG FITNESS</p>
      <p class="subtitle">
        Start your journey today and sign up! Press the log in button and follow
        the directions.
      </p>
    </div>
    <div>
      <a class="button is-primary" id="sign-up-button" @click="navigateToSignUp"
        ><strong>Sign up</strong></a
      >
    </div>
    <div>
      <a class="button is-primary" id="log-in-button" @click="navigateToLogin"
        >Log In</a
      >
    </div>
  </section>
</template>
