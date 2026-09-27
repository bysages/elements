<script setup lang="ts">
import { Icon, Timer } from "@bysages/vue";

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
        <div class="grid justify-items-center gap-[0.125rem]">
          <Timer.Item :type="unit.type" />
          <span class="text-xs text-tertiary">{{ unit.label }}</span>
        </div>
      </template>
    </Timer.Area>
    <Timer.Control>
      <Timer.ActionTrigger action="start">
        <Icon name="play" />
        Start
      </Timer.ActionTrigger>
      <Timer.ActionTrigger action="pause">
        <Icon name="pause" />
        Pause
      </Timer.ActionTrigger>
      <Timer.ActionTrigger action="resume">Resume</Timer.ActionTrigger>
      <Timer.ActionTrigger action="reset">
        <Icon name="rotate-ccw" />
        Reset
      </Timer.ActionTrigger>
    </Timer.Control>
  </Timer.Root>
</template>
