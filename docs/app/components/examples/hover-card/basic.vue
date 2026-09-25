<script setup lang="ts">
import { HoverCard } from "@bysages/vue";
</script>

<template>
  <HoverCard.Root>
    <p class="m-0">
      Liked by
      <HoverCard.Trigger
        class="cursor-pointer text-primary underline underline-offset-[0.2em] decoration-border-strong"
        >@sarah_chen</HoverCard.Trigger
      >
      and 3 others.
    </p>
    <HoverCard.Positioner>
      <HoverCard.Content>
        <HoverCard.Arrow>
          <HoverCard.ArrowTip />
        </HoverCard.Arrow>
        <h3 class="m-0 mb-1 font-serif">Sarah Chen</h3>
        <p class="m-0 mb-2 text-secondary">@sarah_chen</p>
        <p class="mb-3">
          Design engineer. Building quiet interfaces where the ink settles before the eye arrives.
        </p>
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
      </HoverCard.Content>
    </HoverCard.Positioner>
  </HoverCard.Root>
</template>
