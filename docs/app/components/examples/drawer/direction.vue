<script setup lang="ts">
import { Drawer } from "@bysages/vue";

const directions = [
  { value: "down", edge: "bottom" },
  { value: "up", edge: "top" },
  { value: "start", edge: "left" },
  { value: "end", edge: "right" },
] as const;
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: var(--bs-space-3)">
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
  </div>
</template>
