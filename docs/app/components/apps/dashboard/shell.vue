<script setup lang="ts">
import { Avatar, AvatarGroup, Badge, Button, Layout, Typography } from "@bysages/vue";
import { ref } from "vue";

const stops = [
  { label: "Overview", icon: "M3 3v18h18M7 14l4-4 3 3 5-6" },
  {
    label: "Accounts",
    icon: "M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM21 21v-2a4 4 0 0 0-3-3.87M15 3.13a4 4 0 0 1 0 7.75",
  },
  { label: "Billing", icon: "M2 5h20v14H2zM2 10h20" },
  {
    label: "Reports",
    icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 15h6M9 11h2",
  },
  {
    label: "Settings",
    icon: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z",
  },
];

const activeStop = ref("Overview");

const collapsed = ref(false);
</script>

<template>
  <Layout.Root sider="start" class="shell">
    <Layout.Sider v-model:collapsed="collapsed" collapsed-width="0rem">
      <nav class="shell-nav" aria-label="Console sections">
        <Button
          v-for="stop in stops"
          :key="stop.label"
          :variant="activeStop === stop.label ? 'subtle' : 'ghost'"
          class="shell-stop"
          :aria-current="activeStop === stop.label ? 'page' : undefined"
          @click="activeStop = stop.label"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path :d="stop.icon" />
          </svg>
          {{ stop.label }}
        </Button>
      </nav>
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
  display: grid;
  gap: var(--bs-space-1);
  padding: var(--bs-space-3);
}

.shell-stop {
  justify-content: flex-start;
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
