import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { getSuppliers } from '@/views/SuppliersView/api'
import { useAlert } from '@/stores/alert'

import type { Ref } from 'vue'
import type { Supplier } from '@/views/SuppliersView/types'

export const useSuppliersStore = defineStore('suppliers', () => {
  const itemsPerPage = 10
  const suppliers: Ref<Supplier[]> = ref([])
  const count: Ref<number> = ref(0)
  const totalPages = computed(() => Math.ceil(count.value / itemsPerPage))

  const getSuppliersAction = async (params?: object) => {
    const alertsStore = useAlert()

    try {
      const res = await getSuppliers(params)
      suppliers.value = res.results
      count.value = res.count
    } catch (e: any) {
      alertsStore.show({
        type: 'error',
        text: `Failed to fetch suppliers list. Error: ${e.message}.`
      })
    }
  }

  return { suppliers, count, getSuppliersAction, totalPages }
})
