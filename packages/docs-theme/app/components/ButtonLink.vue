<script setup lang="ts">
import { Button } from "@bysages/vue";

import { NuxtLink } from "#components";

withDefaults(
  defineProps<{
    to: string;
    target?: string;
    variant?: "solid" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
  }>(),
  { variant: "solid", size: "md" },
);
</script>

<template>
  <Button :variant="variant" :size="size" as-child>
    <NuxtLink :to="to" :target="target">
      <slot />
    </NuxtLink>
  </Button>
</template>
