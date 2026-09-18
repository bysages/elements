<script setup lang="ts">
import { Container } from "@bysages/vue";

const sizes = ["narrow", "readable", "wide", "full"] as const;
</script>

<template>
  <div style="display: grid; gap: var(--bs-space-4); inline-size: 100%">
    <Container
      v-for="size in sizes"
      :key="size"
      :size="size"
      style="background: var(--bs-color-surface-3)"
    >
      <code style="font-size: var(--bs-font-size-sm)">{{ size }}</code>
    </Container>
  </div>
</template>
