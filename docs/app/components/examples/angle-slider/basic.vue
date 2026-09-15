<script setup lang="ts">
import { ref } from "vue";
import { AngleSlider } from "@bysages/vue";

const value = ref(45);
</script>

<template>
  <AngleSlider.Root v-model="value" style="width: 160px">
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
