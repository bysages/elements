<script setup lang="ts">
import { Button, Layout } from "@bysages/vue";

const stops = ["Overview", "Ledger", "Archive", "Settings"];
</script>

<template>
  <Layout.Root sider="start" style="min-block-size: 24rem">
    <Layout.Sider>
      <nav style="display: grid; gap: var(--bs-gap-xs); padding: var(--bs-padding-sm)">
        <Button
          v-for="stop in stops"
          :key="stop"
          variant="ghost"
          style="justify-content: flex-start"
        >
          {{ stop }}
        </Button>
      </nav>
    </Layout.Sider>
    <Layout.Header>
      <strong style="font-size: var(--bs-font-size-lg)">The workbench</strong>
    </Layout.Header>
    <Layout.Content>
      <div style="display: grid; gap: var(--bs-gap-md); max-inline-size: 72ch">
        <p style="margin: 0">
          The content area takes the flow's full measure and holds it to a readable column.
        </p>
        <p style="margin: 0">
          Below the flow the footer rests at the foot of the grid, however little content there is.
        </p>
      </div>
    </Layout.Content>
    <Layout.Footer>
      <p style="margin: 0; color: var(--bs-color-text-tertiary)">
        By Sages Elements — the paper-and-ink system.
      </p>
    </Layout.Footer>
  </Layout.Root>
</template>
