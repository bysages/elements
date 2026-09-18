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
  <div
    style="
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--bs-space-4);
      inline-size: 100%;
    "
  >
    <figure v-for="entry in fits" :key="entry.fit" style="margin: 0">
      <Image
        :src="SAMPLE"
        :alt="entry.caption"
        :fit="entry.fit"
        style="inline-size: 100%; aspect-ratio: 1 / 1"
      />
      <figcaption
        style="
          margin-block-start: 0.5rem;
          font-size: var(--bs-font-size-sm);
          color: var(--bs-color-text-secondary);
        "
      >
        {{ entry.caption }}
      </figcaption>
    </figure>
  </div>
</template>
