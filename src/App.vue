<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { RouterView } from 'vue-router'
import Alert from '@/modules/Alert'
import Container from '@/components/Container.vue'
import MainNav from '@/components/MainNav.vue'

import { useAuthStore } from '@/stores/auth'
import { TOKEN_STORAGE_KEY } from '@/common/constants'

//store
const authStore = useAuthStore()
const hasAuthToken = computed(() => !!authStore.authToken)

///

// nav
const isOpen = ref('false')
///

//
</script>

<template lang="pug">
v-app
  v-layout
    v-app-bar(title="Opply Task")
    MainNav(
      v-if="hasAuthToken"
      v-model="isOpen"
    )
    v-main
      Alert
      Container
        RouterView
</template>
