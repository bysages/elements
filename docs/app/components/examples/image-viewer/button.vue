<script setup lang="ts">
import { Button, ImageViewer } from "@bysages/vue";

const FULL = "https://picsum.photos/seed/elements-viewer/1600/1000";
</script>

<template>
  <ImageViewer :src="FULL" alt="A photograph from the archive">
    <Button>Open viewer</Button>
  </ImageViewer>
</template>
