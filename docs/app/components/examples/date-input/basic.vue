<script setup lang="ts">
import { DateInput } from "@bysages/vue";
</script>

<template>
  <DateInput.Root>
    <DateInput.Label>Publication date</DateInput.Label>
    <DateInput.Control>
      <DateInput.SegmentGroup>
        <DateInput.SegmentContext v-slot="segmentProps">
          <DateInput.Segment :segment="segmentProps" />
        </DateInput.SegmentContext>
      </DateInput.SegmentGroup>
    </DateInput.Control>
    <DateInput.HiddenInput />
  </DateInput.Root>
</template>
