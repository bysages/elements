<script setup lang="ts">
import { Pagination } from "@bysages/vue";
</script>

<template>
  <Pagination
    :default-value="3"
    :count="5000"
    :page-size="10"
    :sibling-count="2"
    label="Archive pages"
  />
</template>
