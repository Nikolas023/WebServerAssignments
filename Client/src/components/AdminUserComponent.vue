<script setup lang="ts">
import { ref } from 'vue'

const users = ref([
  { id: 1, username: 'user1', email: 'user1@example.com', role: 'admin' },
  { id: 2, username: 'user2', email: 'user2@example.com', role: 'user' },
  // Add more users as needed
])

function deleteUser(userId: number) {
  users.value = users.value.filter(user => user.id !== userId)
}
</script>

<template>
  <table
    class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
  >
    <thead>
      <tr>
        <th>Username</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role }}</td>
        <td>
          <button class="button is-danger" @click="deleteUser(user.id)">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.table {
  margin-top: 3em;
}
</style>
