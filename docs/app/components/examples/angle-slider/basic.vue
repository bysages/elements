<script setup lang="ts">
import { AngleSlider } from "@bysages/vue";
import { ref } from "vue";

const angle = ref(45);
</script>

<template>
  <AngleSlider v-model="angle" label="Light angle" class="w-40" />
</template>
