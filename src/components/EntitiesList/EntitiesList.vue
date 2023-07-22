<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { useDisplay } from 'vuetify'

// Seems like 'vuetify/components' part of Vuetify package does NOT have VDatatable component
// It's not mentioned in the Vuetify docs, realized that when digging in the package as couldn't get table to appear.
//Same applies to VSkeletonLoader component.
import { VDataTable } from 'vuetify/labs/VDataTable'
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'

import type { VDataTableItem, VDataTableHeader } from './types'
import type { Ref } from 'vue'

// viewport related
const { mobile } = useDisplay()
///

// props
const props = defineProps({
  headers: {
    type: Array,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  itemsPerPage: {
    type: Number,
    required: false,
    default: 10
  },
  totalItemsCount: {
    type: Number,
    required: true
  },
  itemNameRedirect: {
    type: Boolean,
    required: false,
    default: true
  }
})
//

// emits
const emit = defineEmits(['load-items'])
///

// routing
const router = useRouter()
const route = useRoute()
const getItemRoute = (item: VDataTableItem) => ({ name: 'u.supplier', params: { id: item.value } })
///

// pagination
const currentPage = ref(Number(route.query.page) || 1)
const totalPages = computed(() => Math.ceil(props.totalItemsCount / props.itemsPerPage))

const onPageChange = async (val: number) => {
  isLoading.value = true
  router.push({
    name: route.name as string,
    query: {
      page: val
    }
  })

  emit('load-items', { params: route.query, onLoadedCallback: stopLoading })
}

watch(currentPage, (val) => onPageChange(val))
///

// loading items
const stopLoading = () => (isLoading.value = false)
const loadItemsInitially = async () => {
  emit('load-items', {
    params: route.query,
    onLoadedCallback: () => (isInitiallyLoaded.value = true)
  })
}
loadItemsInitially()

// UI related
const isLoading: Ref<boolean> = ref(false)
const isInitiallyLoaded: Ref<boolean> = ref(false)

///
</script>

<template lang="pug">
v-skeleton-loader(
  v-if="!isInitiallyLoaded",
  type="table"
)
v-data-table(
  v-else
  sort-asc-icon="fas fa-chevron-up"
  sort-desc-icon="fas fa-chevron-down"
  prev-icon="fas fa-chevron-left"
  next-icon="fas fa-chevron-right"
  last-icon="fas fa-angles-right"
  first-icon="fas fa-angles-left"
  v-bind="{ headers, items }"
  :item-value="name"
  :loading="isLoading"
)
  template(#item.name="{ item }")
    RouterLink.supplier-link(:to="getItemRoute(item)")
      | {{ item.columns.name }}
  template(#bottom)
    .text-center.pt-2 
    v-pagination(
      v-model="currentPage"
      :size="mobile ? 'small' : 'default'"
      :length="totalPages"
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
