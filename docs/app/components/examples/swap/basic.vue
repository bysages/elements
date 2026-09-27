<script setup lang="ts">
import { Icon, Swap } from "@bysages/vue";
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
        <Icon name="check" />
      </Swap.Indicator>
      <Swap.Indicator type="off">
        <Icon name="x" />
      </Swap.Indicator>
    </Swap.Root>
  </button>
</template>
