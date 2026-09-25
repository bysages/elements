<script setup lang="ts">
import { Stack } from "@bysages/vue";

const steps = ["none", "xs", "sm", "md", "lg", "xl"] as const;
</script>

<template>
  <div class="grid w-full gap-4">
    <Stack v-for="step in steps" :key="step" :gap="step">
      <div class="border border-border bg-surface-3 px-3 py-2 text-sm">{{ step }}</div>
      <div class="border border-border bg-surface-3 px-3 py-2 text-sm">…</div>
    </Stack>
  </div>
</template>
