import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { router } from '@/router'

import { createUser, getAuthToken } from '@/modules/Auth/api'
import type { LoginCredentials, NewUserData } from '@/modules/Auth/types'

const TOKEN_STORAGE_KEY = 'opply-auth-token'

export const useAuthStore = defineStore('auth', () => {
  const user = reactive({})

  const onCreate = (userData: NewUserData) => {
    createUser(userData)
  }

  const onLogin = async (loginCredentials: LoginCredentials) => {
    const token = await getAuthToken(loginCredentials)
    window.sessionStorage.setItem(TOKEN_STORAGE_KEY, token)

    // temporary workaround
    // Without timeout the request to suppliers endpoint is getting called without
    // without Authorization header as there is race condition between setting token in session
    // storage and calling /suppliers endpoint
    setTimeout(() => {
      router.push('/suppliers')
    }, 100)
  }

  const onLogout = () => {
    console.log('on logout user')
  }

  return { user, onCreate, onLogin, onLogout }
})
