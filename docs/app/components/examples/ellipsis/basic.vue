<script setup lang="ts">
import { Ellipsis } from "@bysages/vue";

const title = "A long chapter title walks into a narrow column and leaves its tail at the door";
</script>

<template>
  <div class="w-80">
    <Ellipsis :title="title">{{ title }}</Ellipsis>
  </div>
</template>
