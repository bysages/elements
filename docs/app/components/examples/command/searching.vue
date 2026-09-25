<script setup lang="ts">
import { Button, Command } from "@bysages/vue";
import { ref } from "vue";

const open = ref(false);

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
</script>

<template>
  <div class="w-full">
    <p class="mb-4 text-sm text-tertiary">
      Open the palette and type “the”, “app”, or nothing at all — typing narrows the ledger across
      every group, and the empty state speaks when nothing answers.
    </p>
    <Button @click="open = true">Open and start typing</Button>
    <Command
      v-model:open="open"
      :items="commands"
      placeholder="Type a command…"
      @select="open = false"
    />
  </div>
</template>
