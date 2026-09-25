<script setup lang="ts">
import { NavigationMenu } from "@bysages/vue";
</script>

<template>
  <NavigationMenu.Root>
    <NavigationMenu.List>
      <NavigationMenu.Item value="overview">
        <NavigationMenu.Trigger>Overview</NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <span class="block px-(--bs-padding-md) pb-1 pt-2 text-xs tracking-label text-tertiary">
            Get started
          </span>
          <NavigationMenu.Link href="#quick-start">
            <span class="flex flex-col gap-1">
              <strong>Quick start</strong>
              <span class="text-secondary text-sm"> Install and assemble </span>
            </span>
          </NavigationMenu.Link>
          <NavigationMenu.Link href="#styling">
            <span class="flex flex-col gap-1">
              <strong>Styling</strong>
              <span class="text-secondary text-sm"> Tokens, hairlines, light </span>
            </span>
          </NavigationMenu.Link>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Link href="#guides" :current="true">Guides</NavigationMenu.Link>
      </NavigationMenu.Item>
      <NavigationMenu.Item value="resources">
        <NavigationMenu.Trigger>Resources</NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <span class="block px-(--bs-padding-md) pb-1 pt-2 text-xs tracking-label text-tertiary">
            Learn
          </span>
          <NavigationMenu.Link href="#accessibility">
            <span class="flex flex-col gap-1">
              <strong>Accessibility</strong>
              <span class="text-secondary text-sm"> Contrast and density tiers </span>
            </span>
          </NavigationMenu.Link>
          <NavigationMenu.Link href="#releases">
            <span class="flex flex-col gap-1">
              <strong>Releases</strong>
              <span class="text-secondary text-sm"> What settled into the paper </span>
            </span>
          </NavigationMenu.Link>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
    </NavigationMenu.List>
    <NavigationMenu.ViewportPositioner>
      <NavigationMenu.Viewport />
    </NavigationMenu.ViewportPositioner>
  </NavigationMenu.Root>
</template>
