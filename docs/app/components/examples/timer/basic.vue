<script setup lang="ts">
import { pause, play, rotate_ccw } from "@bysages/icons";
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
        <Icon :glyph="play" />
        Start
      </Timer.ActionTrigger>
      <Timer.ActionTrigger action="pause">
        <Icon :glyph="pause" />
        Pause
      </Timer.ActionTrigger>
      <Timer.ActionTrigger action="resume">Resume</Timer.ActionTrigger>
      <Timer.ActionTrigger action="reset">
        <Icon :glyph="rotate_ccw" />
        Reset
      </Timer.ActionTrigger>
    </Timer.Control>
  </Timer.Root>
</template>
