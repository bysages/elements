<script setup lang="ts">
import { AspectRatio } from "@bysages/vue";

const ratios = ["1 / 1", "4 / 3", "16 / 9"];
</script>

<template>
  <div class="grid w-full grid-cols-3 gap-4">
    <AspectRatio v-for="ratio in ratios" :key="ratio" :ratio="ratio">
      <div class="grid place-items-center border border-border bg-surface-3 text-sm text-secondary">
        {{ ratio }}
      </div>
    </AspectRatio>
  </div>
</template>
