<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userId = (route.params as { id: string }).id // Extract userId from the URL
const username = ref('') // Username entered by the user.

const apiUrl = import.meta.env.VITE_API_URL

interface User {
  id: string
  username: string
  email: string
}

const searchResults = ref<User[]>([])

const searchUsers = async () => {
  try {
    if (username.value.trim() === '') {
      alert('Please enter a username to search.')
      return
    }

    const response = await fetch(
      `${apiUrl}/api/v1/users/username/${username.value}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const result = await response.json()

    if (response.ok) {
      if (result) {
        searchResults.value = [result] // Wrap the result in an array
      } else {
        alert('User does not exist.')
        searchResults.value = [] // Clear previous results
      }
    } else {
      alert("Error: User doesn't exist")
    }
  } catch (error) {
    alert("Error: User doesn't exist" + error)
  }
}

const addFriend = async () => {
  try {
    const response = await fetch(
      `${apiUrl}/api/v1/friends/${userId}/${username.value}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const result = await response.json()

    if (response.ok) {
      alert('Friend added successfully!')
    } else {
      alert('UserId: ' + userId)
      alert('username: ' + username.value)
      alert('Error: ' + result.message)
    }
  } catch (error) {
    alert('Error: ' + error)
  }
}
</script>

<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="content">
          <h1 class="title is-1">People Search</h1>
          <div class="field">
            <label class="label">Type in a username</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Search"
                v-model="username"
              />
              <button
                class="button is-primary"
                id="searchBtn"
                @click="searchUsers"
              >
                Search
              </button>
            </div>
          </div>
          <div class="card" v-for="user in searchResults" :key="user.id">
            <div class="card-content">
              <p><strong>Username:</strong> {{ user.username }}</p>
              <p><strong>Email:</strong> {{ user.email }}</p>
              <button @click="addFriend()" class="button is-primary">
                Add Friend
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.column {
  margin-top: 2rem;
}

.card {
  margin-top: 1.5rem;
}

#searchBtn {
  margin-top: 1rem;
}
</style>
