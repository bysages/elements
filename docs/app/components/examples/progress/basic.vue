<script setup lang="ts">
import { Progress } from "@bysages/vue";
</script>

<template>
  <Progress.Root :default-value="42" style="max-inline-size: 22rem">
    <Progress.Label>Copying the archive</Progress.Label>
    <Progress.ValueText />
    <Progress.Track>
      <Progress.Range />
    </Progress.Track>
  </Progress.Root>
</template>
