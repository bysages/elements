<script setup lang="ts">
import { Skeleton } from "@bysages/vue";
</script>

<template>
  <div style="display: grid; gap: 0.75rem; inline-size: 24rem">
    <Skeleton style="block-size: 1.25rem; inline-size: 60%" />
    <Skeleton style="block-size: 0.875rem; inline-size: 100%" />
    <Skeleton style="block-size: 0.875rem; inline-size: 92%" />
    <Skeleton style="block-size: 0.875rem; inline-size: 70%" />
  </div>
</template>
