import { ref } from 'vue'
import { defineStore } from 'pinia'
import { router } from '@/router'

import { createUser, getAuthToken } from '@/modules/Auth/api'
import { useAlert } from '@/stores/alert'
import { TOKEN_STORAGE_KEY } from '@/common/constants'
import type { LoginCredentials, NewUserData } from '@/modules/Auth/types'
import type { Ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const authToken: Ref<string> = ref(window.sessionStorage.getItem(TOKEN_STORAGE_KEY))

  const onCreate = async (userData: NewUserData) => {
    const { show } = useAlert()

    try {
      await createUser(userData)

      router.push('/')
      show({
        type: 'success',
        text: 'User created successfully.'
      })
    } catch (e) {
      show({
        type: 'error',
        text: `Failed to create user. Error: ${e.message}`
      })
    }
  }

  const onLogin = async (loginCredentials: LoginCredentials) => {
    const token = await getAuthToken(loginCredentials)
    authToken.value = token
    window.sessionStorage.setItem(TOKEN_STORAGE_KEY, token)
    router.push('/suppliers')
  }

  const onLogout = () => {
    authToken.value = ''
    window.sessionStorage.removeItem(TOKEN_STORAGE_KEY)
    router.push('/')
  }

  return { authToken, onCreate, onLogin, onLogout }
})
