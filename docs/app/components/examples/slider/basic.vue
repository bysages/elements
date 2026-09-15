<script setup lang="ts">
import { Slider } from "@bysages/vue";
</script>

<template>
  <Slider.Root :default-value="[40]" :min="0" :max="100" :step="1">
    <div style="display: flex; justify-content: space-between; align-items: baseline">
      <Slider.Label>Volume</Slider.Label>
      <Slider.ValueText />
    </div>
    <Slider.Control>
      <Slider.Track>
        <Slider.Range />
      </Slider.Track>
      <Slider.Thumb :index="0">
        <Slider.HiddenInput />
      </Slider.Thumb>
    </Slider.Control>
  </Slider.Root>
</template>
