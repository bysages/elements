<script setup lang="ts">
import { Menu } from "@bysages/vue";

const items = [
  { label: "New file", value: "new-file" },
  { label: "Open…", value: "open", disabled: true },
  { label: "Save", value: "save" },
  { label: "Save as…", value: "save-as" },
  { label: "Export", value: "export" },
];
</script>

<template>
  <Menu trigger="File" :items="items" />
</template>
