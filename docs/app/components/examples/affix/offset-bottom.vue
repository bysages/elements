<script setup lang="ts">
import { Affix } from "@bysages/vue";

const passages = 14;
</script>

<template>
  <div
    class="h-80 overflow-y-auto overscroll-contain rounded-md border border-border bg-surface-0 p-4"
  >
    <div class="space-y-4">
      <p v-for="n in passages" :key="n" class="m-0 leading-relaxed text-secondary">
        Passage {{ n }} — scroll this panel: the action bar waits at the lower edge while the
        passages travel above it.
      </p>
    </div>
    <Affix class="pt-4" offset-bottom="0px">
      <div
        class="flex gap-3 items-center justify-between px-4 py-3 bg-surface-1 border border-border rounded-sm text-sm tracking-label"
      >
        <strong>Review draft</strong>
        <span class="text-tertiary">Save · Publish</span>
      </div>
    </Affix>
  </div>
</template>
