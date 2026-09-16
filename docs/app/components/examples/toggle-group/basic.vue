<script setup lang="ts">
import { ToggleGroup } from "@bysages/vue";

const strokeAttrs = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true",
};

const aligns = [
  { value: "left", label: "Align left", d: "M4 4v16M9 8h10M9 12h12M9 16h7" },
  { value: "center", label: "Align center", d: "M12 4v16M7 8h10M4 12h16M8 16h8" },
  { value: "right", label: "Align right", d: "M20 4v16M5 8h10M3 12h12M8 16h7" },
  { value: "justify", label: "Align justified", d: "M4 6h16M4 12h16M4 18h16" },
];
</script>

<template>
  <ToggleGroup.Root :default-value="['left']" aria-label="Text alignment">
    <ToggleGroup.Item
      v-for="align in aligns"
      :key="align.value"
      :value="align.value"
      :aria-label="align.label"
    >
      <svg v-bind="strokeAttrs"><path :d="align.d" /></svg>
    </ToggleGroup.Item>
  </ToggleGroup.Root>
</template>
