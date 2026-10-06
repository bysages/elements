<script setup lang="ts">
import { x } from "@bysages/icons";
import { Drawer, Icon } from "@bysages/vue";
</script>

<template>
  <Drawer.Root>
    <Drawer.Trigger>Open drawer</Drawer.Trigger>
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
          <Icon :glyph="x" />
        </Drawer.CloseTrigger>
      </Drawer.Content>
    </Drawer.Positioner>
  </Drawer.Root>
</template>
