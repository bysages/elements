<script setup lang="ts">
import { Toggle } from "@bysages/vue";
</script>

<template>
  <Toggle.Root aria-label="Toggle bold">
    <Toggle.Indicator>B</Toggle.Indicator>
  </Toggle.Root>
  <Toggle.Root :default-pressed="true" aria-label="Toggle italic">
    <Toggle.Indicator>I</Toggle.Indicator>
  </Toggle.Root>
</template>
