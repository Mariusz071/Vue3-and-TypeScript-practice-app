import axios from '@/services/axios'
import type { SuppliersResponse } from './types'

export const getSuppliers = async (params: object | null): Promise<SuppliersResponse> => {
  const res = await axios({
    url: '/api/v1/suppliers/',
    method: 'get',
    params
  })

  return res.data
}
