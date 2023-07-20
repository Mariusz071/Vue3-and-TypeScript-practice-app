import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = reactive({})

  const onCreate = () => {
    console.log('on creaate user')
  }

  const onLogin = () => {
    console.log('on login user')
  }

  const onLogout = () => {
    console.log('on logout user')
  }

  return { user, onCreate, onLogin, onLogout }
})
