<script setup lang="ts">
import { Link } from "@bysages/vue";

defineProps<{ kicker?: string; title: string; lede?: string; sourceUrl?: string }>();
</script>

<template>
  <header class="max-w-[44rem]">
    <p v-if="kicker" class="m-0 mb-2 text-sm uppercase tracking-label text-tertiary">
      {{ kicker }}
    </p>
    <h1 class="m-0 mb-3 font-serif text-4xl leading-tight">{{ title }}</h1>
    <p v-if="lede" class="m-0 mb-3 text-secondary">{{ lede }}</p>
    <!-- Important flags outrank the unlayered link stylesheet: the source
         door is quiet ink that darkens under the hand, never the
         primary dye the library paints by default. -->
    <Link
      v-if="sourceUrl"
      :href="sourceUrl"
      target="_blank"
      rel="noopener"
      class="text-tertiary! text-sm! no-underline! hover:text-secondary! hover:underline! hover:underline-offset-[0.2em]!"
      >View source</Link
    >
  </header>
</template>
