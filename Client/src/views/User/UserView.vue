<template>
  <UserNavbarComponent :user="user" />
  <UserContentComponent :user="user" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { User } from '../../models/users'
import UserContentComponent from '@/components/WorkoutComponent.vue'
import UserNavbarComponent from '@/components/UserNavbarComponent.vue'

const user = ref<User | null>(null)

const userFromSignup = JSON.parse(
  localStorage.getItem('userData') || '{}',
) as User

user.value = userFromSignup
</script>
