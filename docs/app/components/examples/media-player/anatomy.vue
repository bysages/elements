<script setup lang="ts">
import { Video } from "@bysages/vue";

const video = "https://mdn.github.io/shared-assets/videos/tears-of-steel-battle-clip-medium.mp4";
const poster =
  "https://mdn.github.io/shared-assets/images/examples/tears-of-steel-battle-clip-medium-poster.jpg";
</script>

<template>
  <Video.Root
    :src="video"
    :poster="poster"
    label="Composed video player"
    :playback-rates="[0.5, 1, 1.5]"
    class="w-full"
  >
    <Video.Stage>
      <Video.Media />
    </Video.Stage>
    <Video.Controls>
      <Video.PlayButton />
      <Video.Timeline />
      <Video.Time />
      <Video.MuteButton />
      <Video.Volume />
      <Video.Captions />
      <Video.Rate />
      <Video.PipButton />
      <Video.FullscreenButton />
    </Video.Controls>
  </Video.Root>
</template>
