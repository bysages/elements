<script setup lang="ts">
import { Badge, Button, Drawer, Layout, Typography } from "@bysages/vue";

import ConsoleNav from "./console-nav.vue";

const headings: Record<string, string> = {
  Overview: "Revenue console",
  Accounts: "Accounts",
  Billing: "Billing",
  Reports: "Reports",
  Settings: "Console settings",
};

// The owning page swaps the content pane as the stop changes, so every
// nav entry leads somewhere real.
const activeStop = defineModel<string>({ default: "Overview" });

const collapsed = ref(false);
const navOpen = ref(false);

function pickStop(label: string) {
  activeStop.value = label;
  navOpen.value = false;
}
</script>

<template>
  <!-- The library's Layout has no automatic responsive behavior — the
       shell owns it. @container makes this root the containment context
       the sider folds against, and the arbitrary variant strips the
       folded rail's hairline (the important flag outranks the
       unlayered core stylesheet). -->
  <Layout.Root
    sider="start"
    class="@container min-h-full [&_[data-part=sider][data-collapsed]]:border-e-0!"
  >
    <Layout.Sider v-model:collapsed="collapsed" collapsed-width="0rem" class="@max-[60rem]:hidden">
      <ConsoleNav v-model="activeStop" />
    </Layout.Sider>
    <Layout.Header>
      <!-- The narrow container hides the sider outright, so its fold
           button would answer nobody; there the same burger raises the
           drawer instead — two triggers, one icon, split by the rail's
           own breakpoint. -->
      <Button
        variant="ghost"
        size="sm"
        square
        class="@max-[60rem]:hidden!"
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
      <Button
        variant="ghost"
        size="sm"
        square
        class="hidden! @max-[60rem]:flex!"
        aria-label="Open navigation"
        @click="navOpen = true"
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
      <Typography.Heading>{{ headings[activeStop] ?? "Revenue console" }}</Typography.Heading>
      <Badge tone="info" variant="subtle">Q3</Badge>
      <span class="flex-1" />
      <span class="text-sm text-tertiary">Finance team</span>
    </Layout.Header>
    <Layout.Content>
      <slot />
    </Layout.Content>
  </Layout.Root>

  <!-- The same rail, raised as a sheet on a narrow container. -->
  <Drawer.Root :open="navOpen" swipe-direction="left" @update:open="navOpen = $event">
    <Teleport to="body">
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content aria-label="Console navigation" class="flex flex-col">
          <Drawer.Title class="sr-only">Console navigation</Drawer.Title>
          <ConsoleNav v-model="activeStop" @select="pickStop" />
        </Drawer.Content>
      </Drawer.Positioner>
    </Teleport>
  </Drawer.Root>
</template>
