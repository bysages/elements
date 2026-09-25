<script setup lang="ts">
import { Button, Card, ConfigProvider } from "@bysages/vue";

const contentStyle = { display: "flex", flexWrap: "wrap", gap: "var(--bs-gap-sm)" };
const cardStyle = { inlineSize: "26rem" };
</script>

<template>
  <ConfigProvider density="comfortable">
    <div class="grid gap-4 justify-items-start">
      <Card.Root :style="cardStyle">
        <Card.Header>
          <Card.Title>Comfortable — the outer provider's tier</Card.Title>
          <Card.Description>Local to this host element and its descendants.</Card.Description>
        </Card.Header>
        <Card.Content :style="contentStyle">
          <Button>Primary</Button>
          <Button variant="ghost">Secondary</Button>
        </Card.Content>
      </Card.Root>
      <ConfigProvider density="compact">
        <Card.Root :style="cardStyle">
          <Card.Header>
            <Card.Title>Compact — the inner provider, its own scope only</Card.Title>
            <Card.Description>The outer scope stays where it was.</Card.Description>
          </Card.Header>
          <Card.Content :style="contentStyle">
            <Button>Primary</Button>
            <Button variant="ghost">Secondary</Button>
          </Card.Content>
        </Card.Root>
      </ConfigProvider>
    </div>
  </ConfigProvider>
</template>
