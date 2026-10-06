<script setup lang="ts">
import { SegmentGroup } from "@bysages/vue";
</script>

<template>
  <SegmentGroup.Root default-value="week">
    <SegmentGroup.Indicator />
    <SegmentGroup.Item value="day">
      <SegmentGroup.ItemText>Day</SegmentGroup.ItemText>
      <SegmentGroup.ItemControl />
      <SegmentGroup.ItemHiddenInput />
    </SegmentGroup.Item>
    <SegmentGroup.Item value="week">
      <SegmentGroup.ItemText>Week</SegmentGroup.ItemText>
      <SegmentGroup.ItemControl />
      <SegmentGroup.ItemHiddenInput />
    </SegmentGroup.Item>
    <SegmentGroup.Item value="month">
      <SegmentGroup.ItemText>Month</SegmentGroup.ItemText>
      <SegmentGroup.ItemControl />
      <SegmentGroup.ItemHiddenInput />
    </SegmentGroup.Item>
  </SegmentGroup.Root>
</template>
