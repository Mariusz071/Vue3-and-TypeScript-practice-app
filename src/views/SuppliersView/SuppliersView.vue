<script setup lang="ts">
import EntitiesList from '@/components/EntitiesList'
import { useRouter, useRoute } from 'vue-router'
import { useSuppliersStore } from '@/stores/suppliers'

import type { VDataTableHeader } from '@/components/EntitiesList/types'

// routing
const router = useRouter()
const route = useRoute()
///

// store
const suppliersStore = useSuppliersStore()
///

const headers: VDataTableHeader[] = [
  {
    title: 'Suplier name',
    align: 'start',
    sortable: true,
    key: 'name'
  },
  {
    title: 'Descrtiption',
    align: 'start',
    sortable: false,
    key: 'description'
  }
]
</script>

<template lang="pug">
v-card(color="primary")
  v-card-title Suppliers
  v-card-text
    EntitiesList(
      v-bind="{ headers }"
      :items="suppliersStore.items"
      :total-items-count="suppliersStore.count"
      item-name-redirect
      @load-items="suppliersStore.getItemsAction"
    )
</template>
