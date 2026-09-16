<script setup lang="ts">
import { Tooltip } from "@bysages/vue";
</script>

<template>
  <Tooltip.Root :positioning="{ placement: 'bottom-start' }">
    <Tooltip.Trigger>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        aria-hidden="true"
      >
        <path d="M12 3v12m0 0-4-4m4 4 4-4M4 20h16" />
      </svg>
      <span>Hover me</span>
    </Tooltip.Trigger>
    <Tooltip.Positioner>
      <Tooltip.Content>Ink answers only when asked.</Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.Root>
</template>
