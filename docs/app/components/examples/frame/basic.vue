<script setup lang="ts">
import { Frame } from "@bysages/vue";
import { h } from "vue";

// <style> tags in a client template are stripped by the compiler, so the
// head slot renders one through a function component instead. Padding
// rides the .frame-root mount, not body — the frame measures that mount,
// so body padding would fall outside its height.
const FrameHead = () =>
  h(
    "style",
    "body { margin: 0; font: 14px/1.6 sans-serif; color: #2a2622; } " +
      ".frame-root { padding: 16px; } " +
      "em { color: #1f4e79; font-style: normal; }",
  );
</script>

<template>
  <!-- The sandboxed document only exists client-side; hydrating the head
       slot against the server's would mismatch. -->
  <ClientOnly>
    <!-- The vessel's dress is the consumer's (the wrapper carries no
         anatomy); the class also resets the UA's fossil 2px inset border. -->
    <Frame class="bs-docs-frame">
      <template #head>
        <FrameHead />
      </template>
      <p>A <em>frame</em> renders its slot in a sandboxed document.</p>
    </Frame>
  </ClientOnly>
</template>
