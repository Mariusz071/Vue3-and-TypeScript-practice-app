<script setup lang="ts">
// Seems like 'vuetify/components' part of Vuetify package does NOT have VDatatable component
// It's not mentioned in the Vuetify docs, realized that when digging in the package as couldn't get table to appear.
//Same applies to VSkeletonLoader component.
import { VDataTable } from 'vuetify/labs/VDataTable'
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'
import { RouterLink } from 'vue-router'
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'

import { useSuppliersStore } from '@/stores/suppliers'

import type { Ref } from 'vue'
import type { Supplier, VDataTableItem, VDataTableHeader } from './types'

// routing
const router = useRouter()
const route = useRoute()

// Doesnt seem like Vuetify exports types for item within VDataTable
const getSupplierRoute = (item: VDataTableItem) => {
  return { name: 'u.supplier', params: { id: item.value } }
}
///

// store
const suppliersStore = useSuppliersStore()
///

// viewport related
const { mobile } = useDisplay()
///

// table related
const isLoading: Ref<boolean> = ref(false)
const isInitiallyLoaded: Ref<boolean> = ref(!!suppliersStore.suppliers.length)
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
///

// initial suppliers load
const loadSuppliersInitially = async () => {
  await suppliersStore.getSuppliersAction(route.query)
  isInitiallyLoaded.value = true
}
loadSuppliersInitially()
///

// pagination
const currentPage = ref(Number(route.query.page) || 1)

const onPageChange = async (val: number) => {
  isLoading.value = true
  router.push({
    name: 'u.suppliers',
    query: {
      page: val
    }
  })

  await suppliersStore.getSuppliersAction({ page: val })
  isLoading.value = false
}

watch(currentPage, (val) => onPageChange(val))
///
</script>

<template lang="pug">
v-card(color="primary")
  v-card-title Suppliers
  v-card-text
    v-skeleton-loader(
      v-if="!isInitiallyLoaded",
      type="table"
    )
    v-data-table(
      sort-asc-icon="fas fa-chevron-up"
      sort-desc-icon="fas fa-chevron-down"
      prev-icon="fas fa-chevron-left"
      next-icon="fas fa-chevron-right"
      last-icon="fas fa-angles-right"
      first-icon="fas fa-angles-left"
      :headers="headers"
      :items="suppliersStore.suppliers"
      :item-value="name"
      :loading="isLoading"
    )
      template(#item.name="{ item }")
        RouterLink.supplier-link(:to="getSupplierRoute(item)"
        ) {{  item.columns.name }}
      template(#bottom)
        .text-center.pt-2 
        v-pagination(
          v-model="currentPage"
          :size="mobile ? 'small' : 'default'"
          :length="suppliersStore.totalPages"
        )
</template>

<style scoped lang="scss">
:deep(.v-data-table-header__content .v-icon) {
  margin-left: 4px;
}

.supplier-link:hover {
  background: none;
}

.v-data-table {
  // adding rounded-2 class to v-data-table didnt work
  border-radius: 4px;
}
</style>
