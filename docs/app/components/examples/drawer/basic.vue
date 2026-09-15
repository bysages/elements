<script setup lang="ts">
import { Drawer } from "@bysages/vue";
</script>

<template>
  <Drawer.Root>
    <Drawer.Trigger>Open drawer</Drawer.Trigger>
    <Teleport to="body">
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Grabber><Drawer.GrabberIndicator /></Drawer.Grabber>
          <Drawer.Title>Settings</Drawer.Title>
          <Drawer.Description>
            Preferences travel with the sheet — pull the grabber to put them away.
          </Drawer.Description>
          <p>The rest of the sheet is yours to fill.</p>
          <Drawer.CloseTrigger>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </Drawer.CloseTrigger>
        </Drawer.Content>
      </Drawer.Positioner>
    </Teleport>
  </Drawer.Root>
</template>
