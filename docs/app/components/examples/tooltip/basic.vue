<script setup lang="ts">
import { download } from "@bysages/icons";
import { Button, Icon, Tooltip } from "@bysages/vue";
</script>

<template>
  <Tooltip content="Ink answers only when asked.">
    <template #trigger>
      <Button variant="outline" size="sm">
        <Icon :glyph="download" />
        Hover me
      </Button>
    </template>
  </Tooltip>
</template>
