<script setup lang="ts">
import { Alert } from "@bysages/vue";

const notices = [
  {
    status: "info",
    title: "Renewal scheduled",
    description: "The archive will be reindexed tonight.",
  },
  {
    status: "success",
    title: "Sealed and delivered",
    description: "Your petition reached the desk.",
  },
  { status: "warning", title: "Stamp expiring", description: "The permit lapses in seven days." },
  {
    status: "danger",
    title: "Delivery refused",
    description: "The address could not be verified.",
  },
];
</script>

<template>
  <div style="display: grid; gap: 1rem">
    <Alert.Root v-for="n in notices" :key="n.status" :status="n.status" style="inline-size: 30rem">
      <Alert.Icon />
      <Alert.Body>
        <Alert.Title>{{ n.title }}</Alert.Title>
        <Alert.Description>{{ n.description }}</Alert.Description>
      </Alert.Body>
    </Alert.Root>
  </div>
</template>
