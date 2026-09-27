<script setup lang="ts">
import { FloatingPanel, Icon } from "@bysages/vue";

const axes = ["n", "e", "s", "w", "ne", "se", "sw", "nw"] as const;
</script>

<template>
  <FloatingPanel.Root>
    <FloatingPanel.Trigger>Open panel</FloatingPanel.Trigger>
    <FloatingPanel.Positioner>
      <FloatingPanel.Content>
        <!-- The drag trigger is the header's own box — the blank middle
             of the bar must tow the sheet, not just the title text. -->
        <FloatingPanel.DragTrigger>
          <FloatingPanel.Header>
            <FloatingPanel.Title>Notes</FloatingPanel.Title>
            <FloatingPanel.Control>
              <FloatingPanel.StageTrigger stage="minimized">
                <Icon name="minus" />
              </FloatingPanel.StageTrigger>
              <FloatingPanel.StageTrigger stage="maximized">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M4 9V4h5M20 15v5h-5" />
                </svg>
              </FloatingPanel.StageTrigger>
              <FloatingPanel.CloseTrigger>
                <Icon name="x" />
              </FloatingPanel.CloseTrigger>
            </FloatingPanel.Control>
          </FloatingPanel.Header>
        </FloatingPanel.DragTrigger>
        <FloatingPanel.Body> Drag the header to move; pull an edge to resize. </FloatingPanel.Body>
        <FloatingPanel.ResizeTrigger v-for="axis in axes" :key="axis" :axis="axis" />
      </FloatingPanel.Content>
    </FloatingPanel.Positioner>
  </FloatingPanel.Root>
</template>
