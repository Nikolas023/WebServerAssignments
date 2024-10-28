<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isMenuActive = ref(false)
const router = useRouter()

const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value
}

const navigateToHome = () => {
  router.push('/HomeView')
}
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item" id="mainLogo">FITNESS TRACKER</div>
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="toggleMenu"
        :class="{ 'is-active': isMenuActive }"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div
      id="navbarBasicExample"
      class="navbar-menu"
      :class="{ 'is-active': isMenuActive }"
    >
      <div class="navbar-start">
        <router-link class="navbar-item" to="/UserView">
          <span class="icon">
            <i class="fas fa-home"></i>
          </span>
          My Activity
        </router-link>
        <a class="navbar-item">
          <span class="icon">
            <i class="fas fa-chart-bar"></i>
          </span>
          Statistics
        </a>
        <a class="navbar-item">
          <span class="icon">
            <i class="fas fa-users"></i>
          </span>
          Friends Activity
        </a>
        <a class="navbar-item">
          <span class="icon">
            <i class="fas fa-search"></i>
          </span>
          People Search
        </a>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <span class="icon">
              <i class="fas fa-user-shield"></i>
            </span>
            Admin
          </a>
          <div class="navbar-dropdown">
            <router-link class="navbar-item" to="/AdminUserView">
              <span class="icon">
                <i class="fas fa-user"></i>
              </span>
              User
            </router-link>
          </div>
        </div>
      </div>
      <div class="navbar-end">
        <div class="buttons">
          <a class="button is-light" id="log-in-button" @click="navigateToHome">
            Log out
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
