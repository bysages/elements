<script setup lang="ts">
import { Image } from "@bysages/vue";
</script>

<template>
  <!-- A broken source falls back — to the caller's words when they
       have them, to the quiet glyph when they do not. -->
  <div
    style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--bs-space-4); inline-size: 100%"
  >
    <Image
      src="https://localhost/missing.png"
      alt="A missing photograph"
      style="inline-size: 100%; aspect-ratio: 16 / 9"
    >
      <span style="font-size: var(--bs-font-size-sm); color: var(--bs-color-text-tertiary)">
        The negative could not be developed.
      </span>
    </Image>
    <Image
      src="https://localhost/missing.png"
      alt="A missing photograph"
      style="inline-size: 100%; aspect-ratio: 16 / 9"
    />
  </div>
</template>
