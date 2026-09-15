<script setup lang="ts">
import { Clipboard } from "@bysages/vue";
</script>

<template>
  <Clipboard.Root default-value="pnpm add @bysages/vue">
    <Clipboard.Label>Install command</Clipboard.Label>
    <Clipboard.Control>
      <Clipboard.Input />
      <Clipboard.Trigger>
        <Clipboard.Indicator>
          <template #copied>✓</template>
          ⧉
        </Clipboard.Indicator>
      </Clipboard.Trigger>
    </Clipboard.Control>
  </Clipboard.Root>
</template>
