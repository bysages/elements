<script setup lang="ts">
import { BackTop } from "@bysages/vue";
import { ref } from "vue";

const passages = 12;
const scroller = ref<HTMLElement | null>(null);
const scrollEl = () => scroller.value;
</script>

<template>
  <!-- The demo rides its own scroller: the control moors inside the
       box's corner instead of floating over the whole page. -->
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
      Passage {{ n }} — the box travels far enough for the way home to earn its keep. Keep scrolling
      and the little tile rises at the corner of the paper.
    </p>
    <BackTop :scroll-el="scrollEl" :threshold="160" />
  </div>
</template>
