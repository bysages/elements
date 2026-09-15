<script setup lang="ts">
import { HoverCard } from "@bysages/vue";
</script>

<template>
  <HoverCard.Root>
    <p style="margin: 0">
      Liked by
      <HoverCard.Trigger>@sarah_chen</HoverCard.Trigger>
      and 3 others.
    </p>
    <HoverCard.Positioner>
      <HoverCard.Content>
        <HoverCard.Arrow>
          <HoverCard.ArrowTip />
        </HoverCard.Arrow>
        <h3 style="margin: 0 0 0.25rem; font-family: var(--bs-font-serif)">Sarah Chen</h3>
        <p style="margin: 0 0 0.5rem; color: var(--bs-color-text-secondary)">@sarah_chen</p>
        <p style="margin: 0 0 0.75rem">
          Design engineer. Building quiet interfaces where the ink settles before the eye arrives.
        </p>
        <div style="display: flex; gap: 1rem">
          <div style="display: flex; gap: 0.25rem">
            <strong>2,456</strong>
            <span style="color: var(--bs-color-text-secondary)">Following</span>
          </div>
          <div style="display: flex; gap: 0.25rem">
            <strong>14.5K</strong>
            <span style="color: var(--bs-color-text-secondary)">Followers</span>
          </div>
        </div>
      </HoverCard.Content>
    </HoverCard.Positioner>
  </HoverCard.Root>
</template>
