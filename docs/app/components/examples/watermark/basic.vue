<script setup lang="ts">
import { Watermark } from "@bysages/vue";
</script>

<template>
  <!-- The seal redraws itself from the theme's computed styles; it
       never takes a pointer. -->
  <Watermark content="BY SAGES · 内部资料" class="w-full">
    <div class="grid gap-3 p-(--bs-padding-lg) text-sm leading-relaxed text-secondary">
      <p>
        The registry holds each entry twice: once in the ledger, once in the seal that marks it as
        the house's own. The mark beneath the words is quiet by design — it claims the page without
        taking the reader's attention.
      </p>
      <p>
        Copies leave the building with the same seal, faint but present, so the paper can always be
        asked where it was made.
      </p>
    </div>
  </Watermark>
</template>
