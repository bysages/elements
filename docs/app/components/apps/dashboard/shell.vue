<script setup lang="ts">
import { Avatar, AvatarGroup, Badge, Button, Layout, SegmentGroup, Typography } from "@bysages/vue";
import { ref } from "vue";

const stops = ["Overview", "Accounts", "Billing", "Reports", "Settings"];

const activeStop = ref("Overview");

const collapsed = ref(false);
</script>

<template>
  <Layout.Root sider="start" class="shell">
    <Layout.Sider v-model:collapsed="collapsed" collapsed-width="0rem">
      <SegmentGroup.Root
        orientation="vertical"
        :model-value="activeStop"
        class="shell-nav"
        aria-label="Console sections"
        @update:model-value="(value: string | null) => value && (activeStop = value)"
      >
        <SegmentGroup.Indicator />
        <SegmentGroup.Item v-for="stop in stops" :key="stop" :value="stop">
          <SegmentGroup.ItemText>{{ stop }}</SegmentGroup.ItemText>
          <SegmentGroup.ItemControl />
          <SegmentGroup.ItemHiddenInput />
        </SegmentGroup.Item>
      </SegmentGroup.Root>
    </Layout.Sider>
    <Layout.Header>
      <Button
        variant="ghost"
        size="sm"
        square
        :aria-label="collapsed ? 'Expand navigation' : 'Collapse navigation'"
        @click="collapsed = !collapsed"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          aria-hidden="true"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </Button>
      <Typography.Heading class="shell-title">Revenue console</Typography.Heading>
      <Badge tone="info" variant="subtle">Q3</Badge>
      <span class="shell-spacer" />
      <AvatarGroup class="shell-crew">
        <Avatar.Root>
          <Avatar.Fallback>SG</Avatar.Fallback>
        </Avatar.Root>
        <Avatar.Root>
          <Avatar.Fallback>+3</Avatar.Fallback>
        </Avatar.Root>
      </AvatarGroup>
    </Layout.Header>
    <Layout.Content>
      <slot />
    </Layout.Content>
  </Layout.Root>
</template>

<style scoped>
/* The library's Layout has no automatic responsive behavior — the shell
 * owns it. A local container query folds the sider away on narrow
 * canvases, matching the collapse button. */
.shell {
  container-type: inline-size;
  min-block-size: 100%;
}

/* Folded to zero the rail is absent — its hairline goes with it. */
.shell :deep([data-part="sider"][data-collapsed]) {
  border-inline-end: none;
}

.shell-nav {
  inline-size: 100%;
}

.shell-title {
  margin: 0;
}

.shell-spacer {
  flex: 1;
}

.shell-crew {
  margin-inline-end: var(--bs-space-2);
}

@container (max-width: 60rem) {
  .shell :deep([data-part="sider"]) {
    display: none;
  }
}
</style>
