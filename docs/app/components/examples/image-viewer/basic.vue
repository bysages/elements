<script setup lang="ts">
import { ImageViewer } from "@bysages/vue";

const FULL = "https://picsum.photos/seed/elements-viewer/1600/1000";
</script>

<template>
  <ImageViewer :src="FULL" alt="A photograph from the archive" />
</template>
