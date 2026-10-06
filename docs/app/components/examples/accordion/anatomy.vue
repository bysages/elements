<script setup lang="ts">
import { Accordion } from "@bysages/vue";

const items = [
  {
    value: "paper",
    title: "What is the paper-and-ink system?",
    body: "Interfaces are warm paper, content is ink, hierarchy is light — never pure white, never a hard pop.",
  },
  {
    value: "tokens",
    title: "Where do visual values come from?",
    body: "Every color, spacing, radius, elevation, and duration resolves from design tokens; a hardcoded pixel is a bug.",
  },
  {
    value: "ark",
    title: "Who owns the interaction?",
    body: "Headless machinery owns state, ARIA, and positioning; the style layer dresses the anatomy it renders.",
  },
];
</script>

<template>
  <Accordion.Root :default-value="['paper']">
    <Accordion.Item v-for="item in items" :key="item.value" :value="item.value">
      <Accordion.ItemTrigger>
        {{ item.title }}
        <Accordion.ItemIndicator>
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Accordion.ItemIndicator>
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <p>{{ item.body }}</p>
      </Accordion.ItemContent>
    </Accordion.Item>
  </Accordion.Root>
</template>
