<script setup lang="ts">
import { Timer } from "@bysages/vue";

const units = [
  { type: "minutes", label: "min" },
  { type: "seconds", label: "sec" },
];
</script>

<template>
  <Timer.Root :start-ms="18 * 60 * 1000 + 42 * 1000">
    <Timer.Area>
      <template v-for="(unit, index) in units" :key="unit.type">
        <Timer.Separator v-if="index > 0">:</Timer.Separator>
        <div style="display: grid; justify-items: center; gap: 0.125rem">
          <Timer.Item :type="unit.type" />
          <span style="font-size: var(--bs-font-size-xs); color: var(--bs-color-text-tertiary)">{{ unit.label }}</span>
        </div>
      </template>
    </Timer.Area>
    <Timer.Control>
      <Timer.ActionTrigger action="start">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
          <path d="M7 4.5v15l12-7.5z" />
        </svg>
        Start
      </Timer.ActionTrigger>
      <Timer.ActionTrigger action="pause">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
          <path d="M8 5v14M16 5v14" />
        </svg>
        Pause
      </Timer.ActionTrigger>
      <Timer.ActionTrigger action="resume">Resume</Timer.ActionTrigger>
      <Timer.ActionTrigger action="reset">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
          <path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" />
        </svg>
        Reset
      </Timer.ActionTrigger>
    </Timer.Control>
  </Timer.Root>
</template>
