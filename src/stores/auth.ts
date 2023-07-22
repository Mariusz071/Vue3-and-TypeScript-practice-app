import { ref } from 'vue'
import { defineStore } from 'pinia'
import { router } from '@/router'

import { createUser, getAuthToken } from '@/modules/Auth/api'
import { useAlert } from '@/stores/alert'
import { TOKEN_STORAGE_KEY } from '@/common/constants'
import type { LoginCredentials, NewUserData } from '@/modules/Auth/types'
import type { Ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const authToken: Ref<string | null> = ref(window.sessionStorage.getItem(TOKEN_STORAGE_KEY))

  const onCreate = async (userData: NewUserData) => {
    const { show } = useAlert()

    try {
      await createUser(userData)

      router.push('/')
      show({
        type: 'success',
        text: 'User created successfully.'
      })
    } catch (e: any) {
      const message = e?.response.data.username ? e?.response.data.username.join(', ') : e.message
      show({
        type: 'error',
        text: `Failed to create user. Error(s): ${message}`
      })
    }
  }

  const onLogin = async (loginCredentials: LoginCredentials) => {
    const { show } = useAlert()

    try {
      const token = await getAuthToken(loginCredentials)
      authToken.value = token
      window.sessionStorage.setItem(TOKEN_STORAGE_KEY, token)
      router.push('/suppliers')
    } catch (e: any) {
      const message = e?.response.data.nonFieldErrors
        ? e?.response.data.nonFieldErrors.join(', ')
        : e.message

      show({
        type: 'error',
        text: `Failed to log in. Error(s): ${message}`
      })
    }
  }

  const onLogout = () => {
    authToken.value = ''
    window.sessionStorage.removeItem(TOKEN_STORAGE_KEY)
    router.push('/')
  }

  return { authToken, onCreate, onLogin, onLogout }
})
