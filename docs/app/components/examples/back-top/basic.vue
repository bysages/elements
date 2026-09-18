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
      Scroll down — the control rises past 400&nbsp;px.
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
      Passage {{ n }} — the page travels far enough for the way home to earn its keep. Keep
      scrolling and the little tile rises at the corner of the paper.
    </p>
    <BackTop />
  </div>
</template>
