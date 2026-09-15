<script setup lang="ts">
import { NumberInput } from "@bysages/vue";
</script>

<template>
  <NumberInput.Root default-value="42" :min="0" :max="100">
    <NumberInput.Label>Quantity</NumberInput.Label>
    <NumberInput.Control>
      <NumberInput.Input />
      <NumberInput.Scrubber>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          aria-hidden="true"
        >
          <path d="M8 5v14M16 5v14" />
        </svg>
      </NumberInput.Scrubber>
      <NumberInput.IncrementTrigger aria-label="Increment">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          aria-hidden="true"
        >
          <path d="m6 15 6-6 6 6" />
        </svg>
      </NumberInput.IncrementTrigger>
      <NumberInput.DecrementTrigger aria-label="Decrement">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </NumberInput.DecrementTrigger>
    </NumberInput.Control>
  </NumberInput.Root>
</template>
