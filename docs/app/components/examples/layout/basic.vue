<script setup lang="ts">
import { Button, Layout } from "@bysages/vue";

const stops = ["Overview", "Ledger", "Archive", "Settings"];
</script>

<template>
  <!-- The border and paper make the skeleton read as a window on the
       demo canvas — a bare grid melts into the page around it. -->
  <Layout.Root
    sider="start"
    class="min-h-72 overflow-clip rounded-lg border border-border bg-surface-0"
  >
    <Layout.Sider>
      <nav class="grid gap-(--bs-gap-xs) p-(--bs-padding-sm)">
        <Button v-for="stop in stops" :key="stop" variant="ghost" class="justify-start!">
          {{ stop }}
        </Button>
      </nav>
    </Layout.Sider>
    <Layout.Header>
      <strong class="text-lg">The workbench</strong>
    </Layout.Header>
    <Layout.Content>
      <div class="grid gap-(--bs-gap-md) max-w-[72ch]">
        <p class="m-0">
          The content area takes the flow's full measure and holds it to a readable column.
        </p>
        <p class="m-0">
          Below the flow the footer rests at the foot of the grid, however little content there is.
        </p>
      </div>
    </Layout.Content>
    <Layout.Footer>
      <p class="m-0 text-tertiary">By Sages Elements — the paper-and-ink system.</p>
    </Layout.Footer>
  </Layout.Root>
</template>
