<script setup lang="ts">
import { Affix } from "@bysages/vue";

const passages = 14;
</script>

<template>
  <div
    class="h-80 overflow-y-auto overscroll-contain rounded-md border border-border bg-surface-0 p-4"
  >
    <Affix>
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
    <div class="space-y-4 pt-4">
      <p v-for="n in passages" :key="n" class="m-0 leading-relaxed text-secondary">
        Passage {{ n }} — scroll this panel: the toolbar reaches the top and stays there while the
        passages continue beneath it.
      </p>
    </div>
  </div>
</template>
