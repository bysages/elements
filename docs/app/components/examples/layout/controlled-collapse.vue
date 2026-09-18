<script setup lang="ts">
import { Button, Layout } from "@bysages/vue";
import { reactive } from "vue";

const state = reactive({ collapsed: false, width: "16rem" });
const stops = ["Overview", "Ledger", "Archive", "Settings"];
</script>

<template>
  <div style="display: grid; gap: var(--bs-space-4)">
    <Button variant="ghost" style="justify-self: start" @click="state.collapsed = !state.collapsed">
      {{ state.collapsed ? "Expand the rail" : "Fold the rail" }}
    </Button>
    <Layout.Root sider="start" style="min-block-size: 24rem">
      <Layout.Sider
        v-model:collapsed="state.collapsed"
        v-model:width="state.width"
        resizable
        style="min-block-size: 100%"
      >
        <nav style="display: grid; gap: var(--bs-gap-xs); padding: var(--bs-padding-sm)">
          <Button
            v-for="stop in stops"
            :key="stop"
            variant="ghost"
            :aria-label="state.collapsed ? stop : undefined"
            :style="{
              justifyContent: 'flex-start',
              inlineSize: state.collapsed ? '2rem' : '100%',
              paddingInline: state.collapsed ? '0.5rem' : 'var(--bs-padding-sm)',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }"
          >
            <span v-if="!state.collapsed">{{ stop }}</span>
          </Button>
        </nav>
      </Layout.Sider>
      <Layout.Header>
        <strong style="font-size: var(--bs-font-size-lg)">The workbench</strong>
      </Layout.Header>
      <Layout.Content>
        <div style="display: grid; gap: var(--bs-gap-md); max-inline-size: 72ch">
          <p style="margin: 0">
            The rail folds on the caller's word and resizes by hand — drag the hairline at its edge,
            or hold an arrow key.
          </p>
        </div>
      </Layout.Content>
      <Layout.Footer>
        <p style="margin: 0; color: var(--bs-color-text-tertiary)">
          By Sages Elements — the paper-and-ink system.
        </p>
      </Layout.Footer>
    </Layout.Root>
  </div>
</template>
