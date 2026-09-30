<script setup lang="ts">
import { DeferredContent } from "@bysages/vue";
</script>

<template>
  <div class="h-64 overflow-y-auto rounded-md border border-border p-4">
    <p class="m-0 text-sm text-tertiary">Scroll down — the panel mounts on approach.</p>
    <div class="h-48" />
    <DeferredContent>
      <template #placeholder>
        <p class="m-0 text-sm text-tertiary">Waiting below the fold…</p>
      </template>
      <p class="m-0 rounded-md border border-dashed border-border p-4 text-sm">
        Mounted on approach.
      </p>
    </DeferredContent>
  </div>
</template>
