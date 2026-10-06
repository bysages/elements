<script setup lang="ts">
import { NumberInput } from "@bysages/vue";
</script>

<template>
  <NumberInput label="Quantity" placeholder="1" :min="1" :max="12" :step="1" />
</template>
