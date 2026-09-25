<script setup lang="ts">
import { Image } from "@bysages/vue";
</script>

<template>
  <!-- A broken source falls back — to the caller's words when they
       have them, to the quiet glyph when they do not. -->
  <div class="grid grid-cols-2 gap-4 w-full">
    <Image
      src="https://localhost/missing.png"
      alt="A missing photograph"
      class="w-full aspect-[16/9]"
    >
      <span class="text-sm text-tertiary"> The negative could not be developed. </span>
    </Image>
    <Image
      src="https://localhost/missing.png"
      alt="A missing photograph"
      class="w-full aspect-[16/9]"
    />
  </div>
</template>
