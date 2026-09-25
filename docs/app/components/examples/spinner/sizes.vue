<script setup lang="ts">
import { Spinner } from "@bysages/vue";
</script>

<template>
  <div class="flex items-center gap-6">
    <Spinner size="sm" />
    <Spinner size="md" />
    <Spinner size="lg" />
    <span class="text-tertiary">Loading the archive…</span>
  </div>
</template>
