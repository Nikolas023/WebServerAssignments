import supabase from '../models/supabase' // Adjust the path as needed

export const loginUser = async (email: string, password: string) => {
  // Authenticate the user
  const { error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (authError) {
    return { error: authError }
  }

  // Fetch user data from the "users" table
  const { data, error: fetchError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (fetchError || !data) {
    return { error: fetchError || new Error('User not found') }
  }

  return { data }
}
