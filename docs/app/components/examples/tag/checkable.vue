<script setup lang="ts">
import { Tag } from "@bysages/vue";
import { ref } from "vue";

const selected = ref(true);
</script>

<template>
  <Tag v-model="selected" checkable>Selected</Tag>
</template>
