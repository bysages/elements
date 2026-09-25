<script setup lang="ts">
import { Affix } from "@bysages/vue";

const passages = 16;
</script>

<template>
  <div class="w-full">
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
    <div class="pt-6">
      <p v-for="n in passages" :key="n" class="mb-4 leading-relaxed text-secondary">
        Passage {{ n }} — the tools travel with the reader: once their row reaches the top of the
        page it stays there while the chapters move on underneath.
      </p>
    </div>
  </div>
</template>
