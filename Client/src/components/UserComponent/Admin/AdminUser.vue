<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Initialize users ref
interface User {
  id: number
  username: string
  email: string
}

const apiUrl = import.meta.env.VITE_API_URL

const users = ref<User[]>([])

// Function to fetch all users from the backend
async function fetchUsers() {
  try {
    const response = await fetch(`${apiUrl}/api/v1/users`)
    if (response.ok) {
      const data = await response.json()
      users.value = data
    } else {
      const error = await response.json()
      alert('Error fetching users: ' + error.message)
    }
  } catch (error) {
    alert('Error: ' + error)
  }
}

// Call fetchUsers when the component is mounted
onMounted(fetchUsers)

// Function to delete a user by their email
async function deleteUser(email: string) {
  console.log(`Attempting to delete user with email: ${email}`)
  try {
    const response = await fetch(`${apiUrl}/api/v1/users/${email}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      const responseData = await response.json()
      console.log(`Delete successful: ${JSON.stringify(responseData)}`)
      users.value = users.value.filter(user => user.email !== email)
      alert('User deleted successfully')
    } else {
      const error = await response.json()
      console.error('Error deleting user:', error)
      alert('Error deleting user: ' + error.message)
    }
  } catch (error) {
    console.error('Error:', error)
    alert('Error: ' + error)
  }
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
        <td>{{ user.email === 'Nick@mail.com' ? 'admin' : 'user' }}</td>
        <td>
          <button class="button is-danger" @click="deleteUser(user.email)">
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
