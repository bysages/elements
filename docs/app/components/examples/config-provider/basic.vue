<script setup lang="ts">
import { Button, Card, ConfigProvider } from "@bysages/vue";
</script>

<template>
  <div class="grid gap-4 justify-items-start">
    <Card.Root class="w-104">
      <Card.Header>
        <Card.Title>Outside — the page's own density and ink</Card.Title>
        <Card.Description>
          Brush, ink, paper, and the inkstone — the same furniture.
        </Card.Description>
      </Card.Header>
      <Card.Content class="flex flex-wrap gap-[var(--bs-gap-sm)]">
        <Button>Primary</Button>
        <Button variant="ghost">Secondary</Button>
      </Card.Content>
    </Card.Root>
    <ConfigProvider density="compact" accent="qinghua">
      <Card.Root class="w-104">
        <Card.Header>
          <Card.Title>Inside — compact controls under the qinghua accent</Card.Title>
          <Card.Description>
            Density and pigment are fixed in here — mode, scene and paper still ride the page around
            them.
          </Card.Description>
        </Card.Header>
        <Card.Content class="flex flex-wrap gap-[var(--bs-gap-sm)]">
          <Button>Primary</Button>
          <Button variant="ghost">Secondary</Button>
        </Card.Content>
      </Card.Root>
    </ConfigProvider>
  </div>
</template>
