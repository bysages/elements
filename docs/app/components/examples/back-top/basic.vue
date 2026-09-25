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
  <div ref="scroller" class="relative h-72 overflow-y-auto border border-border rounded-md p-4">
    <p v-for="n in passages" :key="n" class="mb-4 leading-relaxed text-secondary">
      Passage {{ n }} — the box travels far enough for the way home to earn its keep. Keep scrolling
      and the little tile rises at the corner of the paper.
    </p>
    <BackTop :scroll-el="scrollEl" :threshold="160" />
  </div>
</template>
