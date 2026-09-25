<script setup lang="ts">
import { Avatar, Badge, Button, Layout, Typography } from "@bysages/vue";
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
];

const activeStop = ref("Overview");

const collapsed = ref(false);
</script>

<template>
  <Layout.Root sider="start" class="shell">
    <Layout.Sider v-model:collapsed="collapsed" collapsed-width="0rem">
      <div class="shell-side">
        <div class="shell-workspace">
          <span class="shell-mark" aria-hidden="true">S</span>
          <span class="shell-org">By Sages</span>
        </div>

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

        <div class="shell-side-foot">
          <Button
            variant="ghost"
            class="shell-stop"
            :aria-current="activeStop === 'Settings' ? 'page' : undefined"
            @click="activeStop = 'Settings'"
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
              <path
                d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
              />
            </svg>
            Settings
          </Button>

          <div class="shell-user">
            <Avatar.Root>
              <Avatar.Fallback>SG</Avatar.Fallback>
            </Avatar.Root>
            <div class="shell-user-meta">
              <span class="shell-user-name">Sage Wei</span>
              <span class="shell-user-mail">sage@bysages.dev</span>
            </div>
          </div>
        </div>
      </div>
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
      <span class="shell-crew-note">Finance team</span>
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

.shell-side {
  display: flex;
  flex-direction: column;
  block-size: 100%;
}

.shell-workspace {
  display: flex;
  align-items: center;
  gap: var(--bs-space-2);
  padding: var(--bs-space-4) var(--bs-space-4);
}

.shell-mark {
  display: grid;
  place-items: center;
  inline-size: 1.25rem;
  block-size: 1.25rem;
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-primary);
  color: var(--bs-color-primary-text);
  font-size: 0.6875rem;
  font-weight: 600;
}

.shell-org {
  font-size: var(--bs-font-size-sm);
  font-weight: 600;
}

.shell-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 var(--bs-space-2);
}

.shell-stop {
  justify-content: flex-start;
}

.shell-side-foot {
  margin-block-start: auto;
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-2);
  padding: var(--bs-space-3) var(--bs-space-2);
  border-block-start: 1px solid var(--bs-color-border);
}

.shell-user {
  display: flex;
  align-items: center;
  gap: var(--bs-space-2);
  padding: var(--bs-space-1) var(--bs-space-2);
}

.shell-user-meta {
  display: flex;
  flex-direction: column;
  min-inline-size: 0;
}

.shell-user-name {
  font-size: var(--bs-font-size-sm);
  font-weight: 500;
}

.shell-user-mail {
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-xs);
  overflow: hidden;
  text-overflow: ellipsis;
}

.shell-title {
  margin: 0;
}

.shell-spacer {
  flex: 1;
}

.shell-crew-note {
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
}

@container (max-width: 60rem) {
  .shell :deep([data-part="sider"]) {
    display: none;
  }
}
</style>
