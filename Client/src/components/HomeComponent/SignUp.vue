<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const firstname = ref('')
const lastname = ref('')
const email = ref('')
const password = ref('')
const password2 = ref('')
const username = ref('')
const router = useRouter()

const signUp = async () => {
  if (password.value !== password2.value) {
    alert('Passwords do not match')
    return
  }

  try {
    const response = await fetch('http://localhost:3000/api/v1/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        username: username.value,
        password: password.value,
        firstname: firstname.value,
        lastname: lastname.value,
      }),
    })

    const result = await response.json()

    if (response.ok) {
      router.push(`/User/${result.user.id}`)
    } else {
      alert('Error: ' + result.error)
    }
  } catch (error) {
    alert('Error: ' + error)
  }
}
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item" id="mainLogo">STRONG FITNESS</div>
      <div class="navbar-start">
        <RouterLink to="/">
          <a class="navbar-item" id="homeBtn">Home</a>
        </RouterLink>
      </div>
    </div>
  </nav>

  <form class="box" @submit.prevent="signUp">
    <div class="field">
      <label class="label">First Name</label>
      <div class="control">
        <input class="input" type="text" v-model="firstname" />
      </div>
    </div>
    <div class="field">
      <label class="label">Last Name</label>
      <div class="control">
        <input class="input" type="text" v-model="lastname" />
      </div>
    </div>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" type="email" v-model="email" />
      </div>
    </div>
    <div class="field">
      <label class="label">Create a Password</label>
      <div class="control">
        <input class="input" type="password" v-model="password" />
      </div>
    </div>
    <div class="field">
      <label class="label">Confirm Password</label>
      <div class="control">
        <input class="input" type="password" v-model="password2" />
      </div>
    </div>
    <div class="field">
      <label class="label">Username</label>
      <div class="control">
        <input class="input" type="text" v-model="username" />
      </div>
    </div>
    <button class="button is-primary" type="submit">Sign up</button>
  </form>
</template>

<style scoped>
#homeBtn {
  height: 100%;
}
</style>
