import { ref } from 'vue'

export class User {
  id?: number
  firstName: string = ''
  lastName: string = ''
  email: string = ''
  username: string = ''
  password: string = ''

  role: string = 'admin'
}

const session = ref({
  user: null as User | null,
  token: '',
  message: '',
  isLoading: false,
})

export const refSession = () => session

export const useLogin = () => ({
  async login(email: string, password: string) {
    session.value.isLoading = true
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await response.json()
    session.value.user = data.data
    session.value.token = data.token
    session.value.message = data.message
    session.value.isLoading = false
  },
  async logout() {
    session.value.user = null
  },
})
