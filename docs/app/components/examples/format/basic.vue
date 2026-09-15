<script setup lang="ts">
import { Format } from "@bysages/vue";

// A fixed past date, not Date.now() — the relative time resolves against
// the machine clock, and a server/client instant far from a unit boundary
// hydrates to the same words.
const released = new Date(2026, 0, 15);
</script>

<template>
  <div style="display: flex; gap: var(--bs-space-6)">
    <Format.Number :value="12345.67" />
    <Format.Byte :value="1536000" />
    <Format.Time :value="new Date(2026, 4, 4, 9, 30)" />
    <Format.RelativeTime :value="released" />
  </div>
</template>
