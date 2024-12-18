<template>
  <UserNavbar :userId="userId" />
  <Friends />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Friends from '@/components/UserComponent/FriendsActivity/Friends.vue'
import UserNavbar from '@/components/UserComponent/UserNavbar.vue'

const route = useRoute()
const userId = ref((route.params as { id: string }).id)
</script>
