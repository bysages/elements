<script setup lang="ts">
import { Audio, Video } from "@bysages/vue";

const audio = "https://mdn.github.io/shared-assets/audio/guitar.mp3";
const video = "https://mdn.github.io/shared-assets/videos/tears-of-steel-battle-clip-medium.mp4";
const poster =
  "https://mdn.github.io/shared-assets/images/examples/tears-of-steel-battle-clip-medium-poster.jpg";
</script>

<template>
  <div class="grid w-full gap-5" style="grid-template-columns: minmax(0, 1fr)">
    <Audio :src="audio" label="Guitar practice recording" class="w-full" />
    <Video :src="video" :poster="poster" label="Tears of Steel sample clip" class="w-full" />
  </div>
</template>
