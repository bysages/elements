<script setup lang="ts">
import { Input } from "@bysages/vue";
import { ref } from "vue";

const name = ref("");
</script>

<template>
  <div style="display: grid; gap: 0.75rem; max-width: 20rem">
    <Input v-model="name" placeholder="Your name" />
    <Input placeholder="Small" size="sm" />
    <Input placeholder="Large" size="lg" />
    <Input placeholder="Invalid" invalid />
    <Input placeholder="Disabled" disabled />
  </div>
</template>
