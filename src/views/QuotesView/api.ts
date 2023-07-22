import axios from '@/services/axios'
import type { QuotesResponse } from './types'

export const getQuotes = async (params: object | null): Promise<QuotesResponse> => {
  const res = await axios({
    url: '/api/v1/quotes/',
    method: 'get',
    params
  })

  return res.data
}
