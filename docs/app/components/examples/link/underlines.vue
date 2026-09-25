<script setup lang="ts">
import { Link } from "@bysages/vue";
</script>

<template>
  <div class="grid gap-3 max-w-112">
    <p class="m-0 text-secondary">
      The catalogue
      <Link href="#" underline="always">always underlines</Link>
      — a quiet rail under the ink.
    </p>
    <p class="m-0 text-secondary">
      The default
      <Link href="#">underlines on hover</Link>
      — rest keeps the page still.
    </p>
    <p class="m-0 text-secondary">
      And
      <Link href="#" underline="none">some links never underline</Link>
      — the pigment alone carries them.
    </p>
  </div>
</template>
