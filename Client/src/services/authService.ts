// src/services/authService.ts
import supabase from '../models/supabase'

export const logInUser = async (email: string, password: string) => {
  // Authenticate user
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  // Check for error
  if (error || !data) {
    return { error: error?.message || 'Invalid credentials' }
  }

  // Fetch user-specific data from the users table
  const { data: userData, error: fetchError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (fetchError || !userData) {
    return { error: fetchError?.message || 'Error fetching user data' }
  }

  return { data: userData } // Return user data
}
