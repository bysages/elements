<script setup lang="ts">
import { Dock } from "@bysages/vue";

const glyphs = ["\u58A8", "\u7EB8", "\u7814", "\u5370", "\u5377", "\u7AE0"];
</script>

<template>
  <Dock>
    <Dock.Item
      v-for="glyph in glyphs"
      :key="glyph"
      class="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-surface-2 text-lg"
    >
      {{ glyph }}
    </Dock.Item>
  </Dock>
</template>
