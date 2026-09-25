<script setup lang="ts">
import { Input } from "@bysages/vue";
import { ref } from "vue";

const name = ref("");
</script>

<template>
  <div class="grid gap-3 w-full">
    <Input v-model="name" placeholder="Your name" />
    <Input placeholder="Small" size="sm" />
    <Input placeholder="Large" size="lg" />
    <Input placeholder="Invalid" invalid />
    <Input placeholder="Disabled" disabled />
  </div>
</template>
