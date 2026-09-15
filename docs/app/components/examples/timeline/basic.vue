<script setup lang="ts">
import { Timeline } from "@bysages/vue";
</script>

<template>
  <Timeline.Root>
    <Timeline.Item>
      <Timeline.Marker />
      <Timeline.Content>
        <strong>Sketch</strong> — the first brush line settles on the paper.
      </Timeline.Content>
    </Timeline.Item>
    <Timeline.Item>
      <Timeline.Marker />
      <Timeline.Content>
        <strong>Ink</strong> — the strokes deepen and the hierarchy appears.
      </Timeline.Content>
    </Timeline.Item>
    <Timeline.Item>
      <Timeline.Marker />
      <Timeline.Content>
        <strong>Seal</strong> — the red stamp closes the finished work.
      </Timeline.Content>
    </Timeline.Item>
  </Timeline.Root>
</template>
