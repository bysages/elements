<script setup lang="ts">
import { Slider } from "@bysages/vue";
import { ref } from "vue";

const volume = ref(40);
</script>

<template>
  <Slider v-model="volume" label="Volume" :min="0" :max="100" :step="1" />
</template>
