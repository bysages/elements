<script setup lang="ts">
import { Toggle } from "@bysages/vue";
</script>

<template>
  <Toggle.Root aria-label="Toggle bold">
    <Toggle.Indicator>
      <template #default>B</template>
      <template #fallback>B</template>
    </Toggle.Indicator>
  </Toggle.Root>
  <Toggle.Root :default-pressed="true" aria-label="Toggle italic">
    <Toggle.Indicator>
      <template #default>I</template>
      <template #fallback>I</template>
    </Toggle.Indicator>
  </Toggle.Root>
</template>
