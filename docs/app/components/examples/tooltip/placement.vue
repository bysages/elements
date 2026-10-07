<script setup lang="ts">
import { Button, Tooltip } from "@bysages/vue";
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <Tooltip content="Top" placement="top">
      <template #trigger><Button variant="outline" size="sm">Top</Button></template>
    </Tooltip>
    <Tooltip content="Right" placement="right">
      <template #trigger><Button variant="outline" size="sm">Right</Button></template>
    </Tooltip>
    <Tooltip content="Bottom" placement="bottom">
      <template #trigger><Button variant="outline" size="sm">Bottom</Button></template>
    </Tooltip>
    <Tooltip content="Left" placement="left">
      <template #trigger><Button variant="outline" size="sm">Left</Button></template>
    </Tooltip>
  </div>
</template>
