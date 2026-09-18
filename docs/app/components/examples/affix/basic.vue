<script setup lang="ts">
import { Affix } from "@bysages/vue";

const passages = 16;
</script>

<template>
  <div style="inline-size: 100%">
    <Affix>
      <div
        style="
          display: flex;
          gap: var(--bs-space-3);
          align-items: center;
          padding: var(--bs-space-3) var(--bs-space-4);
          background: var(--bs-color-surface-1);
          border: 1px solid var(--bs-color-border);
          border-radius: var(--bs-radius-sm);
          font-size: var(--bs-font-size-sm);
          letter-spacing: var(--bs-tracking-label);
        "
      >
        <strong>Reading tools</strong>
        <span style="color: var(--bs-color-text-tertiary)">·</span>
        <span>Contents</span>
        <span>Print</span>
        <span>Share</span>
      </div>
    </Affix>
    <div style="padding-block-start: var(--bs-space-6)">
      <p
        v-for="n in passages"
        :key="n"
        style="
          margin: 0 0 var(--bs-space-4);
          color: var(--bs-color-text-secondary);
          line-height: var(--bs-line-height-relaxed);
        "
      >
        Passage {{ n }} — the tools travel with the reader: once their row reaches the top of the
        page it stays there while the chapters move on underneath.
      </p>
    </div>
  </div>
</template>
