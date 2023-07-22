import axios from '@/services/axios'
import type { Supplier } from './types'

export const getSupplier = async (id: string): Promise<Supplier> => {
  const res = await axios({
    url: `/api/v1/suppliers/${id}/`,
    method: 'get'
  })

  return res.data
}
