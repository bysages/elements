<script setup lang="ts">
import { Drawer, Icon } from "@bysages/vue";

const directions = [
  { value: "down", edge: "bottom" },
  { value: "up", edge: "top" },
  { value: "start", edge: "left" },
  { value: "end", edge: "right" },
] as const;
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <Drawer.Root v-for="d in directions" :key="d.value" :swipe-direction="d.value">
      <Drawer.Trigger>From the {{ d.edge }}</Drawer.Trigger>
      <Teleport to="body">
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Grabber><Drawer.GrabberIndicator /></Drawer.Grabber>
            <Drawer.Title>The {{ d.edge }} sheet</Drawer.Title>
            <Drawer.Description>
              The sheet rises from the {{ d.edge }} edge; drag it back where it came from.
            </Drawer.Description>
            <p>
              The same anatomy serves every edge — the positioner seats it, the corners turn toward
              the page, and the grabber rides the leading edge on the side sheets.
            </p>
            <Drawer.CloseTrigger>
              <Icon name="x" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Teleport>
    </Drawer.Root>
  </div>
</template>
