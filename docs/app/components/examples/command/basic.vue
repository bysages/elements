<script setup lang="ts">
import { Button, Command } from "@bysages/vue";
import { ref } from "vue";

const open = ref(false);
const status = ref("Nothing run yet.");

const commands = [
  { label: "New document", value: "file.new", group: "File", hint: "N" },
  { label: "Save", value: "file.save", group: "File", hint: "S" },
  { label: "Export as PDF", value: "file.export", group: "File", hint: "E" },
  { label: "Toggle theme", value: "appearance.theme", group: "Appearance", hint: "T" },
  { label: "Increase density", value: "appearance.density-up", group: "Appearance", hint: "+" },
  { label: "Decrease density", value: "appearance.density-down", group: "Appearance", hint: "-" },
  { label: "Open documentation", value: "help.docs", group: "Help", hint: "?" },
  { label: "Keyboard shortcuts", value: "help.keys", group: "Help", hint: "K" },
];

const run = (value: string) => {
  status.value = `Ran ${value}`;
};
</script>

<template>
  <div style="inline-size: 100%">
    <Button @click="open = true">
      Open command palette
      <span
        style="
          margin-inline-start: var(--bs-space-2);
          font-size: var(--bs-font-size-xs);
          color: var(--bs-color-text-tertiary);
        "
      >
        Ctrl K
      </span>
    </Button>
    <Command v-model:open="open" :items="commands" placeholder="Type a command…" @select="run" />
    <p
      role="status"
      style="
        margin-block-start: var(--bs-space-4);
        font-size: var(--bs-font-size-sm);
        color: var(--bs-color-text-tertiary);
      "
    >
      {{ status }}
    </p>
  </div>
</template>
