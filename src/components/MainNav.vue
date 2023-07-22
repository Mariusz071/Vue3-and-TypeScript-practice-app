<template lang="pug">
v-navigation-drawer(
  v-model="isOpen"
  v-bind="{ location }"
  app
  dark
)
  v-list.pt-0
    v-list-item(
      v-for="item in navItems"
      :key="item.path"
      :active="item.isActive"
      :to="item.path"
      link
    )
      v-icon.mr-2 {{ item.icon }}
      | {{ item.label }}
  template(#append)
    v-divider.mt-4
    v-list-item(
      @click="authStore.onLogout"
    ) 
      v-icon.mr-2 fa-solid fa-arrow-right-from-bracket
      | Logout
      
  </template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'
import { useAuthStore } from '@/stores/auth'

// navigation
const route = useRoute()
const { xs } = useDisplay()
const isOpen = ref(false)
const location = computed(() => (xs.value ? 'bottom' : 'start'))

const navItems = computed(() => [
  {
    icon: 'fas fa-truck-field',
    label: 'Suppliers',
    path: '/suppliers',
    isActive: route.path.startsWith('/suppliers')
  },
  {
    icon: 'fas fa-clipboard',
    label: 'Quotes',
    path: '/quotes',
    isActive: route.name === 'u.quotes'
  }
])
///

// store
const authStore = useAuthStore()
///
</script>
