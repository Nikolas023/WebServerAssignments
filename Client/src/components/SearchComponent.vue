<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
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
              <input class="input" type="text" placeholder="Search" />
            </div>
          </div>
          <div class="card">
            <div class="card-content">
              <p><strong>Username:</strong> John Doe</p>
              <p><strong>Favorite Activity:</strong> Running</p>
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
