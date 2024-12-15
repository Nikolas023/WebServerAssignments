<script setup lang="ts"></script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item" id="mainLogo">STRONG FITNESS</div>
      <div class="navbar-start">
        <router-link class="navbar-item" id="homeBtn" to="/">Home</router-link>
      </div>
    </div>
  </nav>

  <form class="box">
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

<style scoped></style>
