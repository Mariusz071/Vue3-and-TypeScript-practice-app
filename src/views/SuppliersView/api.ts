import axios from '@/services/axios'
import type { SuppliersResponse } from './types'

export const getSuppliers = async (): Promise<SuppliersResponse> => {
  const res = await axios({
    url: '/api/v1/suppliers/',
    method: 'get'
  })

  return res.data
}
