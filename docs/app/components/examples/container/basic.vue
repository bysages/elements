<script setup lang="ts">
import { Container } from "@bysages/vue";
</script>

<template>
  <!-- The dashed frame is the width the page hands over; the framed
       line is the container's answer — a measure held and centered. -->
  <div class="border border-dashed border-border-strong rounded-md p-4">
    <Container size="readable" class="border border-border bg-surface-2 rounded-md">
      <p class="m-0">
        The page hands the container its width; the container hands back a line long enough to
        settle into and short enough to find its way back to.
      </p>
    </Container>
  </div>
</template>
