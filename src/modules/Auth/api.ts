import axios from '@/services/axios'
import type { LoginCredentials, NewUserData } from './types'

export const createUser = async (userData: NewUserData): Promise<NewUserData> => {
  const res = await axios({
    url: '/api/v1/users/',
    method: 'post',
    data: userData
  })

  return res.data.data
}

export const getAuthToken = async (loginCredentials: LoginCredentials): Promise<string> => {
  const res = await axios({
    url: '/api-token-auth/',
    method: 'post',
    data: loginCredentials
  })

  return res.data.token
}
