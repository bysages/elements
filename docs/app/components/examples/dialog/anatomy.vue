<script setup lang="ts">
import { Dialog } from "@bysages/vue";
</script>

<template>
  <Dialog.Root>
    <Dialog.Trigger>Delete item</Dialog.Trigger>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Title>Delete item</Dialog.Title>
        <Dialog.Description>This action cannot be undone.</Dialog.Description>
        <p>Removed items stay recoverable for 30 days.</p>
        <Dialog.CloseTrigger>×</Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Dialog.Root>
</template>
