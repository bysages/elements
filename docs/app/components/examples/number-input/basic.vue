<script setup lang="ts">
import { Icon, NumberInput } from "@bysages/vue";
</script>

<template>
  <NumberInput.Root default-value="42" :min="0" :max="100">
    <NumberInput.Label>Quantity</NumberInput.Label>
    <NumberInput.Control>
      <NumberInput.Input />
      <NumberInput.Scrubber>
        <Icon name="pause" />
      </NumberInput.Scrubber>
      <NumberInput.IncrementTrigger aria-label="Increment">
        <Icon name="chevron-up" />
      </NumberInput.IncrementTrigger>
      <NumberInput.DecrementTrigger aria-label="Decrement">
        <Icon name="chevron-down" />
      </NumberInput.DecrementTrigger>
    </NumberInput.Control>
  </NumberInput.Root>
</template>
