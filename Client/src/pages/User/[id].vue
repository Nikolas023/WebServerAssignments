<template>
  <UserNavbar :userId="userId" />
  <MyActivity />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MyActivity from '@/components/UserComponent/MyActivity/MyActivity.vue'
import UserNavbar from '@/components/UserComponent/UserNavbar.vue'

const route = useRoute()
const userId = ref((route.params as { id: string }).id)

onMounted(() => {
  alert('User ID:' + userId.value) // This is just for debugging
})
</script>
