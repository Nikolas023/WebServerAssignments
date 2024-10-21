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
        <div class="buttons">
          <a class="button is-light" id="log-in-button"> Log in </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const isMenuActive = ref(false)

    const toggleMenu = () => {
      isMenuActive.value = !isMenuActive.value
    }

    return {
      isMenuActive,
      toggleMenu,
    }
  },
})
</script>
