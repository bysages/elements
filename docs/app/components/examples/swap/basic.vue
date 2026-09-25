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
    class="inline-flex size-10 cursor-pointer items-center justify-center rounded-sm border border-border bg-surface-2 text-foreground"
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
