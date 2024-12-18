<template>
  <UserNavbar :userId="userId" />
  <Search />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Search from '@/components/UserComponent/Search/Search.vue'
import UserNavbar from '@/components/UserComponent/UserNavbar.vue'

const route = useRoute()
const userId = ref((route.params as { id: string }).id)
</script>
