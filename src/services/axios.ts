import axios from 'axios'
import { router } from '@/router'

import mapKeys from 'lodash.mapkeys'
import camelCase from 'lodash.camelCase'

const TOKEN_STORAGE_KEY = 'opply-auth-token'
const API_URL = 'https://february-21.herokuapp.com'

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
  ],
  ...(getAuthToken() && {
    headers: {
      common: {
        Authorization: `Token ${getAuthToken()}`
      }
    }
  })
})

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      router.push('/')
    }
    return Promise.reject(error)
  }
)

export default instance
