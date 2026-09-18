<script setup lang="ts">
import { BackTop } from "@bysages/vue";

const passages = 20;
</script>

<template>
  <div style="inline-size: 100%">
    <p
      style="
        margin: 0 0 var(--bs-space-6);
        font-size: var(--bs-font-size-sm);
        color: var(--bs-color-text-tertiary);
      "
    >
      This one waits for 1200&nbsp;px.
    </p>
    <p
      v-for="n in passages"
      :key="n"
      style="
        margin: 0 0 var(--bs-space-4);
        color: var(--bs-color-text-secondary);
        line-height: var(--bs-line-height-relaxed);
      "
    >
      Passage {{ n }} — a larger threshold: the tile waits until the reader is properly lost before
      offering the way home.
    </p>
    <BackTop :threshold="1200" label="Return to the beginning" />
  </div>
</template>
