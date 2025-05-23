// supabase.js or supabase.ts
import { createClient } from '@supabase/supabase-js'

// Supabase client configuration
const supabaseUrl = process.env.VITE_SUPABASE_URL as string
const supabaseKey = process.env.VITE_SUPABASE_KEY as string

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key must be provided')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
