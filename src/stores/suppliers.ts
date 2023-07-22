import { ref } from 'vue'
import { defineStore } from 'pinia'

import { getSuppliers } from '@/views/SuppliersView/api'
import { useAlert } from '@/stores/alert'

import type { Ref } from 'vue'
import type { Supplier } from '@/views/SuppliersView/types'
import type { GetSuppliersActionParams } from './types'

export const useSuppliersStore = defineStore('suppliers', () => {
  const suppliers: Ref<Supplier[]> = ref([])
  const count: Ref<number> = ref(0)

  const getSuppliersAction = async ({ params, onLoadedCallback }: GetSuppliersActionParams) => {
    const alertsStore = useAlert()

    try {
      const res = await getSuppliers(params)
      suppliers.value = res.results
      count.value = res.count
      onLoadedCallback()
    } catch (e: any) {
      alertsStore.show({
        type: 'error',
        text: `Failed to fetch suppliers list. Error: ${e.message}.`
      })
    }
  }

  return { suppliers, count, getSuppliersAction }
})
