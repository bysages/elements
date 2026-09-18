<script setup lang="ts">
import { Button, ImageViewer } from "@bysages/vue";
import { ref } from "vue";

const SAMPLE = "https://picsum.photos/seed/elements-viewer/1600/1000";
const open = ref(false);
</script>

<template>
  <div style="inline-size: 100%">
    <Button variant="outline" @click="open = true">Open (no zoom)</Button>
    <ImageViewer
      v-model:open="open"
      :src="SAMPLE"
      alt="A photograph from the archive"
      :zoomable="false"
    />
  </div>
</template>
