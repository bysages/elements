<script setup lang="ts">
import { Dialog } from "@bysages/vue";
</script>

<template>
  <Dialog
    trigger="Delete item"
    label="Delete item"
    description="This action cannot be undone."
    content="Removed items stay recoverable for 30 days."
  />
</template>
