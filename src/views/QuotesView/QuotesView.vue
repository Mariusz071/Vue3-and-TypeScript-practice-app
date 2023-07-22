<script setup lang="ts">
import EntitiesList from '@/components/EntitiesList'
import { useRouter, useRoute } from 'vue-router'
import { useQuotesStore } from '@/stores/quotes'

import type { VDataTableHeader } from '@/components/EntitiesList/types'

// routing
const router = useRouter()
const route = useRoute()
///

// store
const quotesStore = useQuotesStore()
///

const headers: VDataTableHeader[] = [
  {
    title: 'Title',
    align: 'start',
    sortable: true,
    key: 'title'
  },
  {
    title: 'Amount',
    align: 'start',
    sortable: false,
    key: 'amount'
  },
  {
    title: 'Created',
    align: 'start',
    sortable: false,
    key: 'created'
  }
]
</script>

<template lang="pug">
v-card(color="primary")
  v-card-title Quotes
  v-card-text
    EntitiesList(
      v-bind="{ headers }"
      :items="quotesStore.quotes"
      :total-items-count="quotesStore.count"
      item-name-redirect
      @load-items="quotesStore.getQuotesAction"
    )
</template>
