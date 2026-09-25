<script setup lang="ts">
import { Skeleton } from "@bysages/vue";
</script>

<template>
  <div class="grid gap-3 w-full">
    <Skeleton class="h-5 w-[60%]" />
    <Skeleton class="h-[0.875rem] w-full" />
    <Skeleton class="h-[0.875rem] w-[92%]" />
    <Skeleton class="h-[0.875rem] w-[70%]" />
  </div>
</template>
