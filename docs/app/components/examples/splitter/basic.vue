<script setup lang="ts">
import { Splitter } from "@bysages/vue";
</script>

<template>
  <Splitter.Root
    :panels="[{ id: 'draft' }, { id: 'notes' }]"
    :default-size="[40, 60]"
    style="height: 160px"
  >
    <Splitter.Panel id="draft">Draft</Splitter.Panel>
    <Splitter.ResizeTrigger id="draft:notes" aria-label="Resize panels">
      <Splitter.ResizeTriggerIndicator />
    </Splitter.ResizeTrigger>
    <Splitter.Panel id="notes">Notes</Splitter.Panel>
  </Splitter.Root>
</template>
