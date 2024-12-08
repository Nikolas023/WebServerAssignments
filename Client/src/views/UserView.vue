<template>
  <UserContentComponent :user="user" />
  <UserNavbarComponent :user="user" />
  <div>
    <p>User ID: {{ user?.id }}</p>
    <!-- Use optional chaining here -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { User } from '../models/users'
import UserContentComponent from '@/components/UserContentComponent.vue'
import UserNavbarComponent from '@/components/UserNavbarComponent.vue'

const user = ref<User | null>(null)

const userFromSignup = JSON.parse(
  localStorage.getItem('userData') || '{}',
) as User

user.value = userFromSignup
</script>
