<script setup lang="ts">
import { Icon, Popover } from "@bysages/vue";
</script>

<template>
  <Popover.Root>
    <Popover.Trigger>Notes</Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content>
        <Popover.CloseTrigger>
          <Icon name="x" />
        </Popover.CloseTrigger>
        <Popover.Title>Reading notes</Popover.Title>
        <Popover.Description>
          Marginalia stay on the paper: this vessel pins to its trigger and dissolves in on
          elevation.
        </Popover.Description>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
</template>
