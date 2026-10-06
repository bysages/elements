<script setup lang="ts">
import { Switch } from "@bysages/vue";
import { ref } from "vue";

const enabled = ref(true);
</script>

<template>
  <div class="grid gap-3 w-full">
    <Switch v-model="enabled" label="Night mode" />
    <Switch label="Reduce motion" />
    <Switch label="Archived" disabled />
  </div>
</template>
