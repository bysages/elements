<script setup lang="ts">
import { TreeView } from "@bysages/vue";

const options = [
  {
    label: "ink",
    value: "ink",
    children: [
      { label: "brush.md", value: "ink/brush" },
      { label: "stone.md", value: "ink/stone" },
    ],
  },
  {
    label: "paper",
    value: "paper",
    children: [{ label: "xuan.md", value: "paper/xuan" }],
  },
];
</script>

<template>
  <TreeView :options="options" :default-value="['ink/brush']" label="Library" />
</template>
