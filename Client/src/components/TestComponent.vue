<script setup lang="ts">
const testClick = () => {
  window.alert('It works!')
}
</script>

<template>
  <button @click="testClick">Click Me</button>
</template>
