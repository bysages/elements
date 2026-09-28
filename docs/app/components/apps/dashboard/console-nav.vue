<script setup lang="ts">
import { Avatar, Button } from "@bysages/vue";

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

// The owning page swaps the content pane as the stop changes, and the
// drawer host closes itself on the same event.
const activeStop = defineModel<string>({ default: "Overview" });
const emit = defineEmits<{ select: [label: string] }>();

function pick(label: string) {
  activeStop.value = label;
  emit("select", label);
}
</script>

<template>
  <div class="flex h-full flex-col">
    <div class="flex items-center gap-2 p-4">
      <span
        class="grid size-5 place-items-center rounded-sm bg-primary text-[0.6875rem] font-semibold text-primary-text"
        aria-hidden="true"
        >S</span
      >
      <span class="text-sm font-semibold">By Sages</span>
    </div>

    <nav class="flex flex-col gap-[2px] px-2" aria-label="Console sections">
      <Button
        v-for="stop in stops"
        :key="stop.label"
        :variant="activeStop === stop.label ? 'solid' : 'ghost'"
        class="justify-start!"
        :aria-current="activeStop === stop.label ? 'page' : undefined"
        @click="pick(stop.label)"
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

    <div class="mt-auto flex flex-col gap-2 border-t border-border px-2 py-3">
      <Button
        variant="ghost"
        class="justify-start!"
        :aria-current="activeStop === 'Settings' ? 'page' : undefined"
        @click="pick('Settings')"
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

      <div class="flex items-center gap-2 px-2 py-1">
        <Avatar.Root>
          <Avatar.Fallback>SG</Avatar.Fallback>
        </Avatar.Root>
        <div class="flex min-w-0 flex-col">
          <span class="text-sm font-medium">Sage Wei</span>
          <span class="overflow-hidden text-ellipsis text-xs text-tertiary">sage@example.com</span>
        </div>
      </div>
    </div>
  </div>
</template>
