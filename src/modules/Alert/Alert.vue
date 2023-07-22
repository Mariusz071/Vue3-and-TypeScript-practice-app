<script lang="ts" setup>
import { useAlert } from '@/stores/alert'
const alertsStore = useAlert()
</script>

<template lang="pug">
v-snackbar(
  :model-value="alertsStore.isVisible"
  top
  :timeout='-1'
  variant="elevated"
  :color="alertsStore.alertType"
)
  | {{ alertsStore.alertText }}
  template(#actions)
    v-btn.border-radius-4(
      size="small"
      icon="fas fa-circle-xmark"
      @click="alertsStore.close"
    )
</template>
