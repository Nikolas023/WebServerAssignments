<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userId = (route.params as { id: string }).id
const username = ref('')
const searchResults = ref<User[]>([])

interface User {
  id: string
  username: string
  email: string
}

const searchUsers = async (query: string) => {
  if (!query.trim()) {
    searchResults.value = []
    return
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/users/autocomplete/search?username=${encodeURIComponent(query)}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    )

    if (response.ok) {
      const results = await response.json()
      searchResults.value = results
    } else {
      const error = await response.text()
      console.error('Server error:', error)
      alert('Error fetching users')
      searchResults.value = []
    }
  } catch (error) {
    console.error('Client error:', error)
    alert('Error: ' + error)
    searchResults.value = []
  }
}

const addFriend = async (username: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/friends/${userId}/${username}`,
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
              <o-autocomplete
                v-model="username"
                :data="searchResults"
                :field="'username'"
                placeholder="Search for a username"
                @input="searchUsers"
              />
            </div>
          </div>
          <div class="card" v-for="user in searchResults" :key="user.id">
            <div class="card-content">
              <p><strong>Username:</strong> {{ user.username }}</p>
              <p><strong>Email:</strong> {{ user.email }}</p>
              <button
                @click="addFriend(user.username)"
                class="button is-primary"
              >
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
</style>
