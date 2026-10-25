<script setup lang="ts">
import { chevron_right } from "@bysages/icons";
import { Icon, TreeView } from "@bysages/vue";

const options = [
  {
    label: "Workspace",
    value: "workspace",
    icon: "folder",
    meta: "12",
    children: [
      { label: "Elements", value: "elements", icon: "file", meta: "8" },
      { label: "Examples", value: "examples", icon: "image", meta: "4" },
    ],
  },
  {
    label: "Agents",
    value: "agents",
    icon: "inbox",
    meta: "3",
    children: [
      { label: "Research", value: "research", icon: "star", meta: "2" },
      { label: "Release", value: "release", icon: "calendar" },
    ],
  },
];
</script>

<template>
  <TreeView
    :options="options"
    :default-value="['elements']"
    :default-expanded-value="['workspace', 'agents']"
    label="Workspace"
  >
    <template #trailing="{ node }">
      <span v-if="node.value === 'agents'" data-part="node-action">
        <Icon :glyph="chevron_right" />
      </span>
    </template>
  </TreeView>
</template>
