<script setup lang="ts">
import { Container } from "@bysages/vue";
</script>

<template>
  <!-- The dashed frame is the width the page hands over; the tinted
       box is the container's answer — a line that holds its length. -->
  <div
    style="
      border: 1px dashed var(--bs-color-border-strong);
      border-radius: var(--bs-radius-md);
      padding: var(--bs-space-4);
    "
  >
    <Container size="readable" style="background: var(--bs-color-surface-3)">
      <p style="margin: 0">
        The page hands the container its width; the container hands back a line long enough to
        settle into and short enough to find its way back to.
      </p>
    </Container>
  </div>
</template>
