<script lang="ts" setup>
// imports
import { computed } from 'vue'
import { useDisplay } from 'vuetify'
import { APP_BAR_HEIGHT } from '@/common/constants'

const { name } = useDisplay()

const containerWidth = computed(() => {
  switch (name.value) {
    case 'xs':
      return '100%'
    case 'sm':
      return '85%'
    case 'md':
      return '75%'
    case 'lg':
      return '75%'
    case 'xl':
      return '60%'
    case 'xxl':
      return '50%'
  }
})
</script>
<template lang="pug">
v-container(
  :style="{ maxWidth: containerWidth, height: `calc(100vh - ${APP_BAR_HEIGHT}px)`}"
)
  slot
</template>
