<script setup lang="ts">
import { Button, Tooltip } from "@bysages/vue";
</script>

<template>
  <Tooltip.Root>
    <Tooltip.Trigger as-child>
      <Button variant="outline" size="sm">
        <Icon name="i-lucide-download" />
        Hover me
      </Button>
    </Tooltip.Trigger>
    <Tooltip.Positioner>
      <Tooltip.Content>Ink answers only when asked.</Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.Root>
</template>
