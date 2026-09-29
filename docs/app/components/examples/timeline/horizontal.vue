<script setup lang="ts">
import { Timeline } from "@bysages/vue";

const moments = [
  { title: "Ground", note: "The stone is squared" },
  { title: "Ink", note: "The pigment meets the water" },
  { title: "Stroke", note: "The hand commits" },
  { title: "Seal", note: "The name closes the work" },
];
</script>

<template>
  <Timeline.Root orientation="horizontal" class="w-full">
    <Timeline.Item v-for="m in moments" :key="m.title">
      <Timeline.Marker />
      <Timeline.Content>
        <div class="text-sm font-medium">{{ m.title }}</div>
        <div class="mt-1 text-xs text-tertiary">{{ m.note }}</div>
      </Timeline.Content>
    </Timeline.Item>
  </Timeline.Root>
</template>
