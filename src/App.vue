<script setup lang="ts">
import { computed } from 'vue'
import Alert from '@/modules/Alert'
import { RouterView } from 'vue-router'
import Container from '@/components/Container.vue'

import { useAuthStore } from '@/stores/auth'
import { TOKEN_STORAGE_KEY } from '@/common/constants'

//store
const authStore = useAuthStore()
const hasAuthToken = computed(() => !!authStore.authToken)
///
</script>

<template lang="pug">
v-app
  v-layout
    v-app-bar(title="Opply Task")
      template(
        v-if="hasAuthToken"
        #append
      )
        v-btn(
          color="secondary"
          @click="authStore.onLogout"
        ) Logout
    v-main
      Alert
      Container
        RouterView
</template>
