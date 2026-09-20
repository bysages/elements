<script setup lang="ts">
import { Tabs } from "@bysages/vue";
</script>

<template>
  <!-- The strip rides the full width, the way a page's own tabs do. -->
  <Tabs.Root default-value="ink" style="inline-size: 100%">
    <Tabs.List style="inline-size: 100%">
      <Tabs.Trigger value="ink">Ink</Tabs.Trigger>
      <Tabs.Trigger value="paper">Paper</Tabs.Trigger>
      <Tabs.Trigger value="light">Light</Tabs.Trigger>
      <Tabs.Indicator />
    </Tabs.List>
    <Tabs.Content value="ink">Content is ink — the marks that carry the words.</Tabs.Content>
    <Tabs.Content value="paper">The ground is warm paper, never pure white.</Tabs.Content>
    <Tabs.Content value="light">Hierarchy is light — shadow answers to the source.</Tabs.Content>
  </Tabs.Root>
</template>
