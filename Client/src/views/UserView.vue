<template>
  <UserContentComponent :user="user" />
  <UserNavbarComponent :user="user" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js'
import { useRoute } from 'vue-router'
import UserContentComponent from '@/components/UserNavbarComponent.vue'
import UserNavbarComponent from '@/components/UserContentComponent.vue'

const supabaseUrl = 'https://fuwrvjbxrmdciutawspf.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1d3J2amJ4cm1kY2l1dGF3c3BmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1NjE5MDQsImV4cCI6MjA0ODEzNzkwNH0.9WdAy4YMPTq0d4-SYlGLEPhf6xjU9SerBS5ZNR5Gy3s'
const supabase = createClient(supabaseUrl, supabaseKey)

const route = useRoute()
const user = ref({})

const fetchUserData = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('userID', route.params.userID)
    .single()

  if (error) {
    console.error('Error fetching user data:', error)
  } else {
    user.value = data
  }
}

onMounted(fetchUserData)
</script>
