<script setup lang="ts">
import { Button, Layout } from "@bysages/vue";
import { reactive } from "vue";

const state = reactive({ collapsed: false, width: "16rem" });
const stops = ["Overview", "Ledger", "Archive", "Settings"];
</script>

<template>
  <div class="grid gap-4">
    <Button variant="ghost" class="justify-self-start" @click="state.collapsed = !state.collapsed">
      {{ state.collapsed ? "Expand the rail" : "Fold the rail" }}
    </Button>
    <Layout.Root sider="start" class="min-h-96">
      <Layout.Sider
        v-model:collapsed="state.collapsed"
        v-model:width="state.width"
        resizable
        class="min-h-full"
      >
        <nav class="grid gap-[var(--bs-gap-xs)] p-[var(--bs-padding-sm)]">
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
        <strong class="text-lg">The workbench</strong>
      </Layout.Header>
      <Layout.Content>
        <div class="grid gap-[var(--bs-gap-md)] max-w-[72ch]">
          <p class="m-0">
            The rail folds on the caller's word and resizes by hand — drag the hairline at its edge,
            or hold an arrow key.
          </p>
        </div>
      </Layout.Content>
      <Layout.Footer>
        <p class="m-0 text-tertiary">By Sages Elements — the paper-and-ink system.</p>
      </Layout.Footer>
    </Layout.Root>
  </div>
</template>
