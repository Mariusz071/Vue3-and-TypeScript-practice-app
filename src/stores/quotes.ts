import { ref } from 'vue'
import { defineStore } from 'pinia'

import { getQuotes } from '@/views/QuotesView/api'
import { useAlert } from '@/stores/alert'

import type { Ref } from 'vue'
import type { Quote } from '@/views/QuotesView/types'
import type { LoadItemsActionParams } from './types'

export const useQuotesStore = defineStore('quotes', () => {
  const items: Ref<Quote[]> = ref([])
  const count: Ref<number> = ref(0)

  const getItemsAction = async ({ params, onLoadedCallback }: LoadItemsActionParams) => {
    const alertsStore = useAlert()

    try {
      const res = await getQuotes(params)
      items.value = res.results
      count.value = res.count

      onLoadedCallback()
    } catch (e: any) {
      alertsStore.show({
        type: 'error',
        text: `Failed to fetch quotes list. Error: ${e.message}.`
      })
    }
  }

  return { items, count, getItemsAction }
})
