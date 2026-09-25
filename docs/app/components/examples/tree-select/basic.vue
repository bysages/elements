<script setup lang="ts">
import { TreeSelect, type TreeSelectNode } from "@bysages/vue";
import { ref } from "vue";

const data: TreeSelectNode[] = [
  {
    label: "Ink",
    value: "ink",
    children: [
      { label: "Pine soot", value: "pine" },
      { label: "Lampblack", value: "lamp" },
    ],
  },
  {
    label: "Pigment",
    value: "pigment",
    children: [
      { label: "Stone green", value: "stone-green" },
      { label: "Azurite", value: "azurite", disabled: true },
    ],
  },
];

const value = ref();
</script>

<template>
  <TreeSelect v-model="value" :data="data" placeholder="Choose a medium…" class="w-full" />
</template>
