<script setup lang="ts">
import { Tour, useTour } from "@bysages/vue";

const tour = useTour({
  steps: [
    {
      id: "welcome",
      type: "dialog",
      title: "Welcome",
      description: "A short walk through the room before the ink settles.",
      actions: [{ label: "Start", action: "next" }],
    },
    {
      id: "anchor",
      type: "tooltip",
      title: "The worktable",
      description: "Everything stays on the paper; nothing leaves the page.",
      target: () => document.getElementById("tour-anchor"),
      actions: [{ label: "Finish", action: "dismiss" }],
    },
  ],
});
</script>

<template>
  <Tour :tour="tour" trigger="Start tour">
    <div id="tour-anchor" class="p-4 border border-dashed border-border">Anchor element</div>
  </Tour>
</template>
