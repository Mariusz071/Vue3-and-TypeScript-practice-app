import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { getSuppliers } from '@/views/SuppliersView/api'
import { useAlert } from '@/stores/alert'

export const useSuppliersStore = defineStore('suppliers', () => {
  const suppliers = ref({})

  const getSuppliersAction = async () => {
    const alertsStore = useAlert()

    try {
      const res = await getSuppliers()
      suppliers.value = res
    } catch (e: any) {
      alertsStore.show({
        type: 'error',
        text: `Please log in first. Error: ${e.message}.`
      })
    }
  }

  return { suppliers, getSuppliersAction }
})
