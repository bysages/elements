<script setup lang="ts">
import { download } from "@bysages/icons";
import { Button, Icon, Tooltip } from "@bysages/vue";
</script>

<template>
  <Tooltip.Root>
    <Tooltip.Trigger as-child>
      <Button variant="outline" size="sm">
        <Icon :glyph="download" />
        Hover me
      </Button>
    </Tooltip.Trigger>
    <Tooltip.Positioner>
      <Tooltip.Content>Ink answers only when asked.</Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.Root>
</template>
