<script setup lang="ts">
import { NavigationMenu } from "@bysages/vue";
</script>

<template>
  <NavigationMenu.Root>
    <NavigationMenu.List>
      <NavigationMenu.Item value="overview">
        <NavigationMenu.Trigger>Overview</NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <span
            style="
              display: block;
              padding: var(--bs-space-2) var(--bs-padding-md) var(--bs-space-1);
              color: var(--bs-color-text-tertiary);
              font-size: var(--bs-font-size-xs);
              letter-spacing: var(--bs-tracking-label);
            "
          >
            Get started
          </span>
          <NavigationMenu.Link href="#quick-start">
            <span style="display: flex; flex-direction: column; gap: var(--bs-space-1)">
              <strong>Quick start</strong>
              <span
                style="color: var(--bs-color-text-secondary); font-size: var(--bs-font-size-sm)"
              >
                Install and assemble
              </span>
            </span>
          </NavigationMenu.Link>
          <NavigationMenu.Link href="#styling">
            <span style="display: flex; flex-direction: column; gap: var(--bs-space-1)">
              <strong>Styling</strong>
              <span
                style="color: var(--bs-color-text-secondary); font-size: var(--bs-font-size-sm)"
              >
                Tokens, hairlines, light
              </span>
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
          <span
            style="
              display: block;
              padding: var(--bs-space-2) var(--bs-padding-md) var(--bs-space-1);
              color: var(--bs-color-text-tertiary);
              font-size: var(--bs-font-size-xs);
              letter-spacing: var(--bs-tracking-label);
            "
          >
            Learn
          </span>
          <NavigationMenu.Link href="#accessibility">
            <span style="display: flex; flex-direction: column; gap: var(--bs-space-1)">
              <strong>Accessibility</strong>
              <span
                style="color: var(--bs-color-text-secondary); font-size: var(--bs-font-size-sm)"
              >
                Contrast and density tiers
              </span>
            </span>
          </NavigationMenu.Link>
          <NavigationMenu.Link href="#releases">
            <span style="display: flex; flex-direction: column; gap: var(--bs-space-1)">
              <strong>Releases</strong>
              <span
                style="color: var(--bs-color-text-secondary); font-size: var(--bs-font-size-sm)"
              >
                What settled into the paper
              </span>
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
