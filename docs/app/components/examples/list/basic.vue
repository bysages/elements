<script setup lang="ts">
import { Avatar, Button, List } from "@bysages/vue";

const rows = [
  {
    initials: "SW",
    title: "Seal registry",
    description: "Who pressed which seal, and when.",
  },
  {
    initials: "LW",
    title: "Letter room",
    description: "Correspondence awaiting the registrar.",
  },
  {
    initials: "AB",
    title: "Archive annex",
    description: "Shelved records, fourth row, eastern cabinet.",
  },
];
</script>

<template>
  <List class="w-full">
    <List.Item v-for="row in rows" :key="row.title">
      <List.Leading>
        <Avatar>{{ row.initials }}</Avatar>
      </List.Leading>
      <List.Content>
        <template #title>{{ row.title }}</template>
        <template #description>{{ row.description }}</template>
      </List.Content>
      <List.Actions>
        <Button variant="ghost" size="sm">Open</Button>
      </List.Actions>
    </List.Item>
  </List>
</template>
