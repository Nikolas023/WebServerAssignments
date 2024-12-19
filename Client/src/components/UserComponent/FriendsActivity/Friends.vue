<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userId = (route.params as { id: string }).id // Extract userId from the URL

const apiUrl = import.meta.env.VITE_API_URL

interface Friend {
  id: number
  firstname: string
  lastname: string
  email: string
}

const friends = ref<Friend[]>([])

const fetchFriends = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/v1/friends/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await response.json()

    if (response.ok) {
      friends.value = result
    } else {
      alert('Error: ' + result.message)
    }
  } catch (error) {
    alert('Error: ' + error)
  }
}

const deleteFriend = async (friendId: number) => {
  try {
    const response = await fetch(
      `${apiUrl}/api/v1/friends/${userId}/${friendId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (response.ok) {
      friends.value = friends.value.filter(friend => friend.id !== friendId)
    } else {
      const result = await response.json()
      alert('Error: ' + result.message)
    }
  } catch (error) {
    alert('Error: ' + error)
  }
}

onMounted(fetchFriends)
</script>

<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column">
        <div class="content">
          <h1 class="title is-1">Friends</h1>
          <div class="card" v-for="friend in friends" :key="friend.id">
            <div class="card-content">
              <p><strong>First Name:</strong> {{ friend.firstname }}</p>
              <p><strong>Last Name:</strong> {{ friend.lastname }}</p>
              <p><strong>Email:</strong> {{ friend.email }}</p>
              <button @click="deleteFriend(friend.id)" class="button is-danger">
                Remove Friend
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.columns {
  margin-top: 1rem;
  margin-left: 2rem;
  margin-right: 2rem;
}
.card {
  margin-top: 1em;
}
</style>
