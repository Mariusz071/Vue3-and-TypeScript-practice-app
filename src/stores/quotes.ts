import { ref } from 'vue'
import { defineStore } from 'pinia'

import { getQuotes } from '@/views/QuotesView/api'
import { useAlert } from '@/stores/alert'

import type { Ref } from 'vue'
import type { Quote } from '@/views/QuotesView/types'
import type { LoadItemsActionParams } from './types'

export const useQuotesStore = defineStore('quotes', () => {
  const quotes: Ref<Quote[]> = ref([])
  const count: Ref<number> = ref(0)

  const getQuotesAction = async ({ params, onLoadedCallback }: LoadItemsActionParams) => {
    const alertsStore = useAlert()

    try {
      const res = await getQuotes(params)
      quotes.value = res.results

      count.value = res.count
      onLoadedCallback()
    } catch (e: any) {
      alertsStore.show({
        type: 'error',
        text: `Failed to fetch quotes list. Error: ${e.message}.`
      })
    }
  }

  return { quotes, count, getQuotesAction }
})
