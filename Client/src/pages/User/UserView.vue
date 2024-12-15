<template>
  <UserNavbarComponent :user="user" />
  <UserContentComponent :user="user" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { User } from '../../models/users'
import UserContentComponent from '@/components/WorkOut.vue'
import UserNavbarComponent from '@/components/UserNavbar.vue'

const user = ref<User | null>(null)

const userFromSignup = JSON.parse(
  localStorage.getItem('userData') || '{}',
) as User

user.value = userFromSignup
</script>
