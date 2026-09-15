<script setup lang="ts">
import { Pagination } from "@bysages/vue";

function chevron(direction: "left" | "right") {
  return direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6";
}
</script>

<template>
  <Pagination.Root :count="5000" :page-size="10" :sibling-count="2">
    <Pagination.PrevTrigger aria-label="Previous page">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
        <path :d="chevron('left')" />
      </svg>
    </Pagination.PrevTrigger>
    <Pagination.Context v-slot="{ pages }">
      <template v-for="(page, index) in pages" :key="index">
        <Pagination.Ellipsis v-if="page.type === 'ellipsis'" :index="index">…</Pagination.Ellipsis>
        <Pagination.Item v-else :value="page.value">{{ page.value }}</Pagination.Item>
      </template>
    </Pagination.Context>
    <Pagination.NextTrigger aria-label="Next page">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
        <path :d="chevron('right')" />
      </svg>
    </Pagination.NextTrigger>
  </Pagination.Root>
</template>
