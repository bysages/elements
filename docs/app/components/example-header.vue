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
    <Link v-if="sourceUrl" :href="sourceUrl" target="_blank" rel="noopener" class="example-source"
      >View source</Link
    >
  </header>
</template>

<style scoped>
/* The library's Link dyes itself primary and deepens on hover; the source
 * door is quiet ink that darkens under the hand. A layered utility cannot
 * win this cascade — the link's own stylesheet is unlayered — so the
 * override rides a scoped rule. */
.example-source {
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
  text-decoration: none;
}

.example-source:hover {
  color: var(--bs-color-text-secondary);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}
</style>
