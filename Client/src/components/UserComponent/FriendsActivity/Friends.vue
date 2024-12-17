<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const friends = [
      { id: 1, name: 'John Doe', activity: 'Running' },
      { id: 2, name: 'Jane Smith', activity: 'Reading' },
      { id: 2, name: 'Jane Smith', activity: 'Reading' },
      { id: 2, name: 'Jane Smith', activity: 'Reading' },
      { id: 2, name: 'Jane Smith', activity: 'Reading' },
      { id: 2, name: 'Jane Smith', activity: 'Reading' },
      { id: 2, name: 'Jane Smith', activity: 'Reading' },
      { id: 2, name: 'Jane Smith', activity: 'Reading' },
      { id: 2, name: 'Jane Smith', activity: 'Reading' },
      { id: 2, name: 'Jane Smith', activity: 'Reading' },
      // Add more friends as needed
    ]

    return { friends }
  },
})
</script>

<!-- 
  Display a random activity from a random friend. Allow the list to extend infinitely while the user scrolls down. When the user clicks on the friend's profile, they should be able to view their activity from there.
-->

<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column">
        <div class="content">
          <h1 class="title is-1">Friends</h1>
          <div class="card" v-for="friend in friends" :key="friend.id">
            <div class="card-content">
              <p><strong>Name:</strong> {{ friend.name }}</p>
              <p><strong>Activity:</strong> {{ friend.activity }}</p>
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
</style>
