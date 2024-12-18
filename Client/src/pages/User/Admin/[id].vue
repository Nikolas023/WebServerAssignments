<template>
  <UserNavbar :user-id="userId" />
  <AdminUser />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import AdminUser from '@/components/UserComponent/Admin/AdminUser.vue'
import UserNavbar from '@/components/UserComponent/UserNavbar.vue'

const route = useRoute()
const userId = ref((route.params as { id: string }).id)
</script>

<style scoped></style>
