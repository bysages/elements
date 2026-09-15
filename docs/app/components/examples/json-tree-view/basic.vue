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
  <JsonTreeView.Root :data="data" :default-expanded-depth="1">
    <JsonTreeView.Tree>
      <template #arrow>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
          <path d="m9 5 7 7-7 7" />
        </svg>
      </template>
    </JsonTreeView.Tree>
  </JsonTreeView.Root>
</template>
