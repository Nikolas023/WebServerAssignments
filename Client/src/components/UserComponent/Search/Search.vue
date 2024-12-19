<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userId = (route.params as { id: string }).id // Extract userId from the URL
const username = ref('') // Username entered by the user

const apiUrl = import.meta.env.VITE_API_URL

interface User {
  id: string
  username: string
  email: string
}

const searchResults = ref<User[]>([])

const searchUsers = async (query: string) => {
  try {
    if (query.trim() === '') {
      searchResults.value = []
      return
    }

    const response = await fetch(
      `${apiUrl}/api/v1/users/search?username=${query}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const result = await response.json()

    if (response.ok) {
      searchResults.value = result // Assign the result directly
    } else {
      searchResults.value = []
    }
  } catch (error) {
    console.error('Error fetching users:', error)
    searchResults.value = []
  }
}

watch(username, newVal => {
  searchUsers(newVal)
})

const addFriend = async (user: User) => {
  try {
    const response = await fetch(
      `${apiUrl}/api/v1/friends/${userId}/${user.username}`,
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
                field="username"
                placeholder="Search"
              />
            </div>
          </div>
          <div class="card" v-for="user in searchResults" :key="user.id">
            <div class="card-content">
              <p><strong>Username:</strong> {{ user.username }}</p>
              <p><strong>Email:</strong> {{ user.email }}</p>
              <button @click="addFriend(user)" class="button is-primary">
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
