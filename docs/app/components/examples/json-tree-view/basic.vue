<script setup lang="ts">
import { JsonTreeView } from "@bysages/vue";

const data = {
  title: "Paper & Ink",
  accent: "qinghua",
  density: "default",
  contrast: 4.8,
  tags: ["paper", "ink", "light"],
};
</script>

<template>
  <JsonTreeView :data="data" :default-expanded-depth="1" />
</template>
