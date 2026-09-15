<script setup lang="ts">
import { Link } from "@bysages/vue";
</script>

<template>
  <div style="display: grid; gap: var(--bs-space-3); max-inline-size: 28rem">
    <p style="margin: 0; color: var(--bs-color-text-secondary)">
      The catalogue
      <Link href="#" underline="always">always underlines</Link>
      — a quiet rail under the ink.
    </p>
    <p style="margin: 0; color: var(--bs-color-text-secondary)">
      The default
      <Link href="#">underlines on hover</Link>
      — rest keeps the page still.
    </p>
    <p style="margin: 0; color: var(--bs-color-text-secondary)">
      And
      <Link href="#" underline="none">some links never underline</Link>
      — the pigment alone carries them.
    </p>
  </div>
</template>
