<script setup lang="ts">
import { Frame } from "@bysages/vue";

// The iframe's stylesheet. A literal <style> is a side-effect tag the
// template compiler refuses, so the element mounts through `is` — the
// head slot teleports it into the frame's document regardless.
const iframeCss = `
  body { margin: 0; padding: 16px; font: 14px/1.6 sans-serif; color: #2a2622; }
  em { color: #1f4e79; font-style: normal; }
`;
</script>

<template>
  <Frame.Root>
    <template #head>
      <component :is="'style'">{{ iframeCss }}</component>
    </template>
    <p>A <em>frame</em> renders its slot in a sandboxed document.</p>
  </Frame.Root>
</template>
