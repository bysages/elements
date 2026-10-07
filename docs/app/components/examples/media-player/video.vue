<script setup lang="ts">
import { Video } from "@bysages/vue";

const video = "https://mdn.github.io/shared-assets/videos/tears-of-steel-battle-clip-medium.mp4";
const poster =
  "https://mdn.github.io/shared-assets/images/examples/tears-of-steel-battle-clip-medium-poster.jpg";
</script>

<template>
  <Video :src="video" :poster="poster" label="Tears of Steel sample clip" class="w-full" />
</template>
