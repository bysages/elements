<script setup lang="ts">
import { chevron_right } from "@bysages/icons";
import { Icon, JsonTreeView } from "@bysages/vue";

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
        <Icon :glyph="chevron_right" />
      </template>
    </JsonTreeView.Tree>
  </JsonTreeView.Root>
</template>
