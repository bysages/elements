<script setup lang="ts">
import { Container } from "@bysages/vue";

const sizes = ["narrow", "readable", "wide", "full"] as const;
</script>

<template>
  <div class="grid gap-4 w-full">
    <Container
      v-for="size in sizes"
      :key="size"
      :size="size"
      class="border border-border bg-surface-2 rounded-md"
    >
      <code class="text-sm">{{ size }}</code>
    </Container>
  </div>
</template>
