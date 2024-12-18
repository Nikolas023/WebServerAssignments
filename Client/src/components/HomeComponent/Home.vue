<script setup lang="ts"></script>

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
      <RouterLink
        to="/SignUpView"
        class="button is-primary"
        id="sign-up-button"
      >
        <strong>Sign up</strong>
      </RouterLink>
    </div>
    <div>
      <RouterLink to="/LoginView" class="button is-primary" id="log-in-button">
        <strong>Log in</strong>
      </RouterLink>
    </div>
  </section>
</template>
