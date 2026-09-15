<script setup lang="ts">
import { Popover } from "@bysages/vue";
</script>

<template>
  <Popover.Root>
    <Popover.Trigger>Notes</Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content>
        <Popover.CloseTrigger>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </Popover.CloseTrigger>
        <Popover.Title>Reading notes</Popover.Title>
        <Popover.Description>
          Marginalia stay on the paper: this vessel pins to its trigger and dissolves in on elevation.
        </Popover.Description>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
</template>
