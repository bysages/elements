<script setup lang="ts">
import { Button } from "@bysages/vue";

defineEmits<{ click: [] }>();
</script>

<template>
  <Button variant="ghost" size="sm" square aria-label="Toggle navigation" @click="$emit('click')">
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <path d="M2 4h12M2 8h12M2 12h12" />
    </svg>
  </Button>
</template>
