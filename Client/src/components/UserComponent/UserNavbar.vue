<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps<{ userId: string }>()
const isMenuActive = ref(false)
const router = useRouter()
const route = useRoute()

const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value
}

const navigateToHome = () => {
  router.push('/')
}

const adminUserId = '5'
const currentUserId = (route.params as { id: string }).id

const isAdmin = currentUserId === adminUserId
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item" id="mainLogo">STRONG FITNESS</div>
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
        <RouterLink class="navbar-item" :to="`/User/${props.userId}`">
          <span class="icon">
            <i class="fas fa-home"></i>
          </span>
          My Activity
        </RouterLink>
        <RouterLink class="navbar-item" :to="`/User/Friends/${props.userId}`">
          <span class="icon">
            <i class="fas fa-users"></i>
          </span>
          Friends Activity
        </RouterLink>
        <RouterLink class="navbar-item" :to="`/User/Search/${props.userId}`">
          <span class="icon">
            <i class="fas fa-search"></i>
          </span>
          People Search
        </RouterLink>
        <div v-if="isAdmin" class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <span class="icon">
              <i class="fas fa-user-shield"></i>
            </span>
            Admin
          </a>
          <div class="navbar-dropdown">
            <RouterLink class="navbar-item" :to="`/User/Admin/${props.userId}`">
              <span class="icon">
                <i class="fas fa-user"></i>
              </span>
              Users
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="navbar-end">
        <div class="buttons">
          <a
            class="button is-light"
            id="log-out-button"
            @click="navigateToHome"
          >
            Log out
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
#log-out-button {
  margin-right: 1em;
  color: black;
  background-color: #bbe1fa;
}
</style>
