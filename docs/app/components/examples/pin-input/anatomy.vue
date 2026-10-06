<script setup lang="ts">
import { PinInput } from "@bysages/vue";
</script>

<template>
  <PinInput.Root>
    <PinInput.Label>Verification code</PinInput.Label>
    <PinInput.Control>
      <PinInput.Input v-for="(v, i) in [0, 1, 2, 3]" :key="i" :index="i" />
    </PinInput.Control>
    <PinInput.HiddenInput />
  </PinInput.Root>
</template>
