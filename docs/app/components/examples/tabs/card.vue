<script setup lang="ts">
import { Tabs } from "@bysages/vue";
</script>

<template>
  <Tabs.Root variant="card" default-value="brush" class="w-full">
    <Tabs.List>
      <Tabs.Trigger value="brush">Brush</Tabs.Trigger>
      <Tabs.Trigger value="ink">Ink</Tabs.Trigger>
      <Tabs.Trigger value="paper">Paper</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="brush">The brush answers the hand.</Tabs.Content>
    <Tabs.Content value="ink">The ink remembers the grinding.</Tabs.Content>
    <Tabs.Content value="paper">The paper holds its breath.</Tabs.Content>
  </Tabs.Root>
</template>
