<script setup lang="ts">
import { Image } from "@bysages/vue";

const SAMPLE = "https://picsum.photos/seed/elements-image/800/500";

const fits = [
  { fit: "cover", caption: "Cover crops to fill" },
  { fit: "contain", caption: "Contain keeps the whole" },
  { fit: "fill", caption: "Fill stretches" },
] as const;
</script>

<template>
  <div class="grid w-full grid-cols-3 gap-4">
    <figure v-for="entry in fits" :key="entry.fit" class="m-0">
      <Image :src="SAMPLE" :alt="entry.caption" :fit="entry.fit" class="w-full aspect-square" />
      <figcaption class="mt-2 text-sm text-secondary">
        {{ entry.caption }}
      </figcaption>
    </figure>
  </div>
</template>
