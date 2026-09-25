<script setup lang="ts">
import { Textarea } from "@bysages/vue";
import { ref } from "vue";

const story = ref("");
</script>

<template>
  <div class="grid gap-3 w-full">
    <Textarea v-model="story" placeholder="Tell the story…" />
    <Textarea placeholder="Invalid" invalid />
    <Textarea placeholder="Disabled" disabled />
  </div>
</template>
