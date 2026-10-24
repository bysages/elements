<script setup lang="ts">
import { Dialog } from "@bysages/vue";
</script>

<template>
  <Dialog.Root>
    <Dialog.Trigger>Open semantics</Dialog.Trigger>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Semantic sections</Dialog.Title>
          <Dialog.Description>Header, Body and Footer stay first-class parts.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>
          <p>Body copy keeps the sheet's reading rhythm.</p>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.CloseTrigger>Acknowledge</Dialog.CloseTrigger>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Positioner>
  </Dialog.Root>
</template>
