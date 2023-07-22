import axios from 'axios'
import { router } from '@/router'
import mapKeys from 'lodash.mapkeys'
import camelCase from 'lodash.camelCase'

import { TOKEN_STORAGE_KEY, API_URL } from '@/common/constants'

const saveAuthTokenLocally = (token: string) => {
  try {
    window.sessionStorage.setItem(TOKEN_STORAGE_KEY, token)
  } catch (e) {
    console.error(e)
  }
}

const getAuthToken = () => {
  try {
    return window.sessionStorage.getItem(TOKEN_STORAGE_KEY)
  } catch (e) {
    console.error(e)
    return null
  }
}

const getAuthTokenFromResponse = (res) => {
  const token = res?.headers?.['Authorization']
  if (token) {
    saveAuthTokenLocally(token)
  }
}

const instance = axios.create({
  baseURL: API_URL,
  transformResponse: [
    (data) => {
      const parsedData = JSON.parse(data)
      const transformedData = mapKeys(parsedData, (_, key: string) => camelCase(key))
      return transformedData
    }
  ]
})

instance.interceptors.request.use((config) => {
  const token = getAuthToken()

  if (token) {
    config.headers['Authorization'] = `Token ${token}`
  }

  return config
})

export default instance
