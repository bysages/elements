<script setup lang="ts">
import { Switch } from "@bysages/vue";
</script>

<template>
  <div style="display: grid; gap: 0.75rem; inline-size: 100%">
    <Switch.Root default-checked>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Dissolve overlays</Switch.Label>
      <Switch.HiddenInput />
    </Switch.Root>
    <Switch.Root>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Show hairlines</Switch.Label>
      <Switch.HiddenInput />
    </Switch.Root>
    <Switch.Root default-checked disabled>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Reduced motion</Switch.Label>
      <Switch.HiddenInput />
    </Switch.Root>
  </div>
</template>
