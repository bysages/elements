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
  <div ref="scroller" class="relative h-72 overflow-y-auto border border-border rounded-md p-4">
    <p v-for="n in passages" :key="n" class="mb-4 leading-relaxed text-secondary">
      Passage {{ n }} — a larger threshold: the tile waits until the reader is properly lost before
      offering the way home.
    </p>
    <BackTop :scroll-el="scrollEl" :threshold="600" label="Return to the beginning" />
  </div>
</template>
