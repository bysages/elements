<script setup lang="ts">
import { AngleSlider } from "@bysages/vue";
import { ref } from "vue";

const value = ref(45);
</script>

<template>
  <AngleSlider.Root v-model="value" class="w-40">
    <AngleSlider.Label>Light angle</AngleSlider.Label>
    <AngleSlider.ValueText />
    <AngleSlider.Control>
      <AngleSlider.MarkerGroup>
        <AngleSlider.Marker :value="0" />
        <AngleSlider.Marker :value="90" />
        <AngleSlider.Marker :value="180" />
        <AngleSlider.Marker :value="270" />
      </AngleSlider.MarkerGroup>
      <AngleSlider.Thumb />
    </AngleSlider.Control>
  </AngleSlider.Root>
</template>
