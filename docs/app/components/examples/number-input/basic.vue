<script setup lang="ts">
import { chevron_down, chevron_up, pause } from "@bysages/icons";
import { Icon, NumberInput } from "@bysages/vue";
</script>

<template>
  <NumberInput.Root default-value="42" :min="0" :max="100">
    <NumberInput.Label>Quantity</NumberInput.Label>
    <NumberInput.Control>
      <NumberInput.Input />
      <NumberInput.Scrubber>
        <Icon :glyph="pause" />
      </NumberInput.Scrubber>
      <NumberInput.IncrementTrigger aria-label="Increment">
        <Icon :glyph="chevron_up" />
      </NumberInput.IncrementTrigger>
      <NumberInput.DecrementTrigger aria-label="Decrement">
        <Icon :glyph="chevron_down" />
      </NumberInput.DecrementTrigger>
    </NumberInput.Control>
  </NumberInput.Root>
</template>
