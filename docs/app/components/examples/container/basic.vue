<script setup lang="ts">
import { Container } from "@bysages/vue";
</script>

<template>
  <Container size="readable" style="background: var(--bs-color-surface-3)">
    <p style="margin: 0">
      The page hands the container its width; the container hands back a line long enough to settle
      into and short enough to find its way back to.
    </p>
  </Container>
</template>
