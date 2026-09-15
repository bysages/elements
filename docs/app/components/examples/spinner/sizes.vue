<script setup lang="ts">
import { Spinner } from "@bysages/vue";
</script>

<template>
  <div style="display: flex; align-items: center; gap: var(--bs-space-6)">
    <Spinner size="sm" />
    <Spinner size="md" />
    <Spinner size="lg" />
    <span style="color: var(--bs-color-text-tertiary)">Loading the archive…</span>
  </div>
</template>
