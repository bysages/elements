<script setup lang="ts">
import { FloatingPanel } from "@bysages/vue";
</script>

<template>
  <FloatingPanel.Root>
    <FloatingPanel.Trigger>Open panel</FloatingPanel.Trigger>
    <FloatingPanel.Positioner>
      <FloatingPanel.Content>
        <FloatingPanel.Header>
          <FloatingPanel.DragTrigger>
            <FloatingPanel.Title>Notes</FloatingPanel.Title>
          </FloatingPanel.DragTrigger>
          <FloatingPanel.Control>
            <FloatingPanel.StageTrigger stage="minimized">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M5 12h14" />
              </svg>
            </FloatingPanel.StageTrigger>
            <FloatingPanel.StageTrigger stage="maximized">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M4 9V4h5M20 15v5h-5" />
              </svg>
            </FloatingPanel.StageTrigger>
            <FloatingPanel.CloseTrigger>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </FloatingPanel.CloseTrigger>
          </FloatingPanel.Control>
        </FloatingPanel.Header>
        <FloatingPanel.Body> Drag the header to move; pull an edge to resize. </FloatingPanel.Body>
      </FloatingPanel.Content>
    </FloatingPanel.Positioner>
  </FloatingPanel.Root>
</template>
