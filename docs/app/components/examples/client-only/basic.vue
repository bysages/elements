<script setup lang="ts">
import { ClientOnly } from "@bysages/vue";
import { computed } from "vue";

// The slot renders after hydration, so window is safe inside it — the
// guard keeps this module itself importable on the server.
const viewport = computed(() =>
  typeof window === "undefined" ? "" : `${window.innerWidth} × ${window.innerHeight}`,
);
</script>

<template>
  <ClientOnly>
    <template #fallback>
      <p style="margin: 0; font-size: var(--bs-font-size-sm); color: var(--bs-color-text-tertiary)">
        Measuring the window…
      </p>
    </template>
    <p style="margin: 0">
      Rendered on the client — this window measures
      <strong>{{ viewport }}</strong> pixels.
    </p>
  </ClientOnly>
</template>
