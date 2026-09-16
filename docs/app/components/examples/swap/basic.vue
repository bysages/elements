<script setup lang="ts">
import { Swap } from "@bysages/vue";
import { ref } from "vue";

const swapped = ref(false);
</script>

<template>
  <button
    type="button"
    aria-label="Toggle check"
    :aria-pressed="swapped"
    style="
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: 2.5rem;
      block-size: 2.5rem;
      border: 1px solid var(--bs-color-border);
      border-radius: var(--bs-radius-sm);
      background: var(--bs-color-surface-2);
      color: var(--bs-color-text-primary);
      cursor: pointer;
    "
    @click="swapped = !swapped"
  >
    <Swap.Root :swap="swapped">
      <Swap.Indicator type="on">
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M4 12.5l5 5L20 6.5" />
        </svg>
      </Swap.Indicator>
      <Swap.Indicator type="off">
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </Swap.Indicator>
    </Swap.Root>
  </button>
</template>
