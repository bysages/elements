<script setup lang="ts">
import { Button, DownloadTrigger } from "@bysages/vue";

const readingList = [
  "# Reading list — the paper-and-ink shelf",
  "",
  "- Surface ladder and hairlines",
  "- The lighting engine's source model",
  "- Container queries over viewport breakpoints",
].join("\n");
</script>

<template>
  <!-- Headless on its own: with asChild the download rides our button. -->
  <DownloadTrigger as-child file-name="reading-list.txt" mime-type="text/plain" :data="readingList">
    <Button>Download the reading list</Button>
  </DownloadTrigger>
</template>
