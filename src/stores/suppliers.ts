import { ref } from 'vue'
import { defineStore } from 'pinia'

import { getSuppliers } from '@/views/SuppliersView/api'
import { useAlert } from '@/stores/alert'

import type { Ref } from 'vue'
import type { Supplier } from '@/views/SuppliersView/types'
import type { LoadItemsActionParams } from './types'

export const useSuppliersStore = defineStore('suppliers', () => {
  const items: Ref<Supplier[]> = ref([])
  const count: Ref<number> = ref(0)

  const getItemsAction = async ({ params, onLoadedCallback }: LoadItemsActionParams) => {
    const alertsStore = useAlert()

    try {
      const res = await getSuppliers(params)
      items.value = res.results
      count.value = res.count
      onLoadedCallback()
    } catch (e: any) {
      alertsStore.show({
        type: 'error',
        text: `Failed to fetch suppliers list. Error: ${e.message}.`
      })
    }
  }

  return { items, count, getItemsAction }
})
