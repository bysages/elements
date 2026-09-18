<script setup lang="ts">
import { Button, Card, ConfigProvider } from "@bysages/vue";
</script>

<template>
  <div style="display: grid; gap: var(--bs-space-4); justify-items: start">
    <Card.Root style="inline-size: 26rem">
      <Card.Header>
        <Card.Title>Outside — the page's own density and ink</Card.Title>
        <Card.Description>
          Brush, ink, paper, and the inkstone — the same furniture.
        </Card.Description>
      </Card.Header>
      <Card.Content style="display: flex; flex-wrap: wrap; gap: var(--bs-gap-sm)">
        <Button>Primary</Button>
        <Button variant="ghost">Secondary</Button>
      </Card.Content>
    </Card.Root>
    <ConfigProvider density="compact" accent="qinghua">
      <Card.Root style="inline-size: 26rem">
        <Card.Header>
          <Card.Title>Inside — compact controls under the qinghua accent</Card.Title>
          <Card.Description>
            The provider carries both attributes; the subtree retiers.
          </Card.Description>
        </Card.Header>
        <Card.Content style="display: flex; flex-wrap: wrap; gap: var(--bs-gap-sm)">
          <Button>Primary</Button>
          <Button variant="ghost">Secondary</Button>
        </Card.Content>
      </Card.Root>
    </ConfigProvider>
  </div>
</template>
