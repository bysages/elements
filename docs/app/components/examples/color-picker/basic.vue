<script setup lang="ts">
import { ColorPicker } from "@bysages/vue";

const savedColors = ["#eb5e41", "#3d5a80", "#61892f", "#d9a648", "#7048a8"];
</script>

<template>
  <ColorPicker default-value="#3d5a80" label="Ink color" :swatches="savedColors" />
</template>
