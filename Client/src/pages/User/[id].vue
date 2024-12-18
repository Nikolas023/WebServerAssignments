<template>
  <UserNavbar :userId="userId" />
  <MyActivity />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import MyActivity from '@/components/UserComponent/MyActivity/MyActivity.vue'
import UserNavbar from '@/components/UserComponent/UserNavbar.vue'

const route = useRoute()
const userId = ref((route.params as { id: string }).id)
</script>
