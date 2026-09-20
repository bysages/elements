<script setup lang="ts">
import { BackTop } from "@bysages/vue";
import { ref } from "vue";

const passages = 16;
const scroller = ref<HTMLElement | null>(null);
const scrollEl = () => scroller.value;
</script>

<template>
  <!-- Moored like the basic demo, but the tile waits longer before it
       rises — 600&nbsp;px of the box's own travel. -->
  <div
    ref="scroller"
    style="
      position: relative;
      height: 18rem;
      overflow-y: auto;
      border: 1px solid var(--bs-color-border);
      border-radius: var(--bs-radius-md);
      padding: var(--bs-space-4);
    "
  >
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
    <BackTop :scroll-el="scrollEl" :threshold="600" label="Return to the beginning" />
  </div>
</template>
