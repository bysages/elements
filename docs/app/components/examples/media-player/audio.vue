<script setup lang="ts">
import { Audio } from "@bysages/vue";

const audio = "https://mdn.github.io/shared-assets/audio/guitar.mp3";
</script>

<template>
  <Audio :src="audio" label="Guitar practice recording" preload="metadata" class="w-full" />
</template>
