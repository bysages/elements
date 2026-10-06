<script setup lang="ts">
import { Editable } from "@bysages/vue";
import { ref } from "vue";

const value = ref("Hello World");
</script>

<template>
  <Editable v-model="value" label="Title" placeholder="Enter text…" />
</template>
