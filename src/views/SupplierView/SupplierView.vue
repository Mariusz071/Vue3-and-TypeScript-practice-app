<script setup lang="ts">
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'

import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getSupplier } from './api'

import type { Ref } from 'vue'
import type { Supplier } from './types'

// routing
const route = useRoute()
///

// fetching supplier
const supplier: Ref<Supplier | null> = ref(null)
const isLoading: Ref<boolean> = ref(true)
const loadSupplier = async () => {
  supplier.value = await getSupplier(route.params.id as string)
  isLoading.value = false
}

loadSupplier()
</script>

<template lang="pug">


v-card(color="primary")
  template(v-if="isLoading")
    v-card-title
      v-skeleton-loader(
        color="primary"
        type="text"
      )
    v-card-text
      v-skeleton-loader(
        color="primary"
        type="text"
      )
  template(v-else)
    v-card-title {{  supplier.name }}
    v-card-text {{  supplier.description }}
    v-card-actions
      v-btn(:to="{ name:'u.suppliers' }") Back
</template>
