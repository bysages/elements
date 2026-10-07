<script setup lang="ts">
import { Image, ImageViewer } from "@bysages/vue";

const FULL = "https://picsum.photos/seed/elements-viewer/1600/1000";
const THUMBNAIL = "https://picsum.photos/seed/elements-viewer/480/320";
</script>

<template>
  <ImageViewer :src="FULL" alt="A photograph from the archive" :zoomable="false">
    <ImageViewer.Preview>
      <Image :src="THUMBNAIL" alt="A photograph from the archive" :width="288" :height="192" />
    </ImageViewer.Preview>
  </ImageViewer>
</template>
