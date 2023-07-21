<script lang="ts">
import { getSuppliers } from './api'
import { useSuppliersStore } from '@/stores/suppliers'

// store
const { suppliers, getSuppliersAction } = useSuppliersStore()
///
getSuppliersAction()
</script>

<template lang="pug">
v-card SUPPLIERS
</template>
