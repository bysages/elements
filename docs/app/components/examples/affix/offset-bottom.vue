<script setup lang="ts">
import { Affix } from "@bysages/vue";

const passages = 16;
</script>

<template>
  <div class="w-full">
    <Affix offset-top="var(--bs-space-12)" offset-bottom="var(--bs-space-4)">
      <div
        class="flex gap-3 items-center px-4 py-3 bg-surface-1 border border-border rounded-sm text-sm tracking-label"
      >
        <strong>Reading tools</strong>
        <span class="text-tertiary">·</span>
        <span>Contents</span>
        <span>Print</span>
        <span>Share</span>
      </div>
    </Affix>
    <div class="pt-4">
      <p v-for="n in passages" :key="n" class="leading-relaxed text-secondary">
        Passage {{ n }} — with both offsets given, the row holds its place inside the band between
        them: clear of the header, clear of the page's end.
      </p>
    </div>
  </div>
</template>
