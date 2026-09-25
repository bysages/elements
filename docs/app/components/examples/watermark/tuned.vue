<script setup lang="ts">
import { Watermark } from "@bysages/vue";
</script>

<template>
  <!-- The seal answers the caller's hand: a heavier ink, a steeper
       angle, a larger measure. -->
  <Watermark
    content="DRAFT · 草稿"
    :opacity="0.12"
    :rotate="-45"
    font-size="1.125rem"
    class="w-full"
  >
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
