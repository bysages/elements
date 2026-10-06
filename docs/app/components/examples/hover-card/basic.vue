<script setup lang="ts">
import { HoverCard } from "@bysages/vue";
</script>

<template>
  <HoverCard
    label="Sarah Chen"
    description="@sarah_chen"
    content="Design engineer. Building quiet interfaces where the ink settles before the eye arrives."
  >
    <template #trigger>
      <p class="m-0">
        Liked by
        <HoverCard.Trigger
          class="cursor-pointer text-primary underline underline-offset-[0.2em] decoration-border-strong"
          >@sarah_chen</HoverCard.Trigger
        >
        and 3 others.
      </p>
    </template>
    <div class="flex gap-4">
      <div class="flex gap-1">
        <strong>2,456</strong>
        <span class="text-secondary">Following</span>
      </div>
      <div class="flex gap-1">
        <strong>14.5K</strong>
        <span class="text-secondary">Followers</span>
      </div>
    </div>
  </HoverCard>
</template>
