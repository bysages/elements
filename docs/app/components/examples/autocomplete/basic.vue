<script setup lang="ts">
import { AutoComplete } from "@bysages/vue";
import { ref } from "vue";

const value = ref("");
const items = ["Cobalt", "Celadon", "Cinnabar", "Ochre", "Ultramarine", "Bamboo", "Indigo"];
</script>

<template>
  <AutoComplete
    v-model="value"
    :items="items"
    placeholder="Pick a pigment…"
    style="inline-size: 100%"
  />
</template>
