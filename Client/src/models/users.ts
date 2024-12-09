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
