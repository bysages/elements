<script setup lang="ts">
import { Textarea } from "@bysages/vue";
import { ref } from "vue";

const story = ref("");
</script>

<template>
  <div style="display: grid; gap: 0.75rem; inline-size: 100%">
    <Textarea v-model="story" placeholder="Tell the story…" />
    <Textarea placeholder="Invalid" invalid />
    <Textarea placeholder="Disabled" disabled />
  </div>
</template>
