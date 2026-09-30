<script setup lang="ts">
import { NavigationMenu } from "@bysages/vue";

const features = [
  { title: "Tokens", copy: "Palettes and tiers on one ramp" },
  { title: "Lighting", copy: "Elevation computed from the source" },
  { title: "Motion", copy: "Ink bleeds, puppets keep strings" },
  { title: "Density", copy: "Whitespace scales, type holds" },
];
</script>

<template>
  <NavigationMenu.Root>
    <NavigationMenu.List>
      <NavigationMenu.Item value="platform">
        <NavigationMenu.Trigger>Platform</NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <div class="grid grid-cols-2 gap-2 p-4">
            <div v-for="feature in features" :key="feature.title" class="p-2">
              <strong class="mb-1 block text-sm">{{ feature.title }}</strong>
              <span class="text-sm text-secondary">{{ feature.copy }}</span>
            </div>
          </div>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
      <NavigationMenu.Item value="docs">
        <NavigationMenu.Link href="#docs">Docs</NavigationMenu.Link>
      </NavigationMenu.Item>
    </NavigationMenu.List>
    <NavigationMenu.ViewportPositioner>
      <NavigationMenu.Viewport />
    </NavigationMenu.ViewportPositioner>
  </NavigationMenu.Root>
</template>
