<script setup lang="ts">
import { Image } from "@bysages/vue";

const SAMPLE = "https://picsum.photos/seed/elements-image/800/500";
</script>

<template>
  <!-- The frame is the consumer's to size; the picture dissolves in
       over the skeleton's breath. -->
  <Image :src="SAMPLE" alt="A photograph from the archive" class="w-full aspect-[8/5]" />
</template>
