<script setup lang="ts">
import { Button, ButtonGroup } from "@bysages/vue";
</script>

<template>
  <ButtonGroup>
    <Button variant="outline">Layers</Button>
    <Button variant="outline" square aria-label="Move up">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m6 14 6-6 6 6" />
      </svg>
    </Button>
    <Button variant="outline" square aria-label="Move down">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </Button>
  </ButtonGroup>
</template>
