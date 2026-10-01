<script setup lang="ts">
import { Bento, Card } from "@bysages/vue";

const tiles = [
  { span: 2, title: "Wide", note: "A tile that claims two tracks" },
  { span: 1, title: "Tall? No — square", note: "One track of measure" },
  { span: 1, title: "Compact", note: "One track" },
  { span: 1, title: "Compact", note: "One track" },
];
</script>

<template>
  <Bento class="w-full">
    <Bento.Cell v-for="(tile, i) in tiles" :key="`${tile.title}-${i}`" :span="tile.span">
      <Card class="h-full p-4">
        <h3 class="m-0 text-sm font-medium">{{ tile.title }}</h3>
        <p class="mb-0 mt-1 text-xs text-tertiary">{{ tile.note }}</p>
      </Card>
    </Bento.Cell>
  </Bento>
</template>
