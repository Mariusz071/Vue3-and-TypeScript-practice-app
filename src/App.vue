<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Container from '@/components/Container.vue'
</script>

<template lang="pug">
v-app
  v-layout
    v-app-bar(title="Opply Task")
    v-main
      Container
        RouterView
</template>
