<script setup lang="ts">
import { Badge, Card } from "@bysages/vue";

// The examples gallery sits outside the content shelves — real pages
// under app/pages/examples — so this index is the entry the header's
// Examples tab lands on.
definePageMeta({ layout: "default", examples: true });

useSeoMeta({
  title: "Examples",
  description:
    "Complete applications built from the Elements library — an admin dashboard, a blog, and an AI chat workbench.",
});

const config = useAppConfig() as {
  github?: { url?: string; branch?: string; rootDir?: string };
};

const sourceUrl = (name: string) =>
  [
    config.github?.url,
    "tree",
    config.github?.branch,
    config.github?.rootDir,
    "app/components/apps",
    name,
  ]
    .filter(Boolean)
    .join("/");

const apps = [
  {
    name: "dashboard",
    title: "Admin Dashboard",
    description:
      "A revenue console: stat cards, charts, and a sortable, filterable, selectable data table with drawer detail and dialog editing.",
    components: ["Layout", "Stat", "Chart", "DataTable", "Drawer", "Dialog", "Toast"],
  },
  {
    name: "blog",
    title: "Blog",
    description:
      "An editorial site: a filterable post grid, an article view with a tracked table of contents, and a comment thread.",
    components: ["Card", "Badge", "Pagination", "Typography", "Toc", "Comment", "Avatar"],
  },
  {
    name: "chat",
    title: "AI Chat Workbench",
    description:
      "A simulated assistant conversation: streamed responses, tool calls, reasoning, and suggestion chips — no network, all local.",
    components: ["AiPromptInput", "AiMessage", "AiResponse", "AiTool", "AiSuggestion"],
  },
];
</script>

<template>
  <div class="mx-auto w-full max-w-[90rem] px-6 pb-12 pt-8">
    <header class="mb-8 max-w-[44rem]">
      <h1 class="m-0 mb-3 font-serif text-4xl leading-tight">Examples</h1>
      <p class="m-0 text-secondary">
        Complete applications assembled from the library — each one is the real components, styled
        only by the design system, running live in this page.
      </p>
    </header>

    <div class="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-5">
      <Card.Root v-for="app in apps" :key="app.name">
        <Card.Header>
          <Card.Title>
            <NuxtLink
              :to="`/examples/${app.name}`"
              class="text-inherit no-underline hover:underline hover:underline-offset-[0.2em]"
            >
              {{ app.title }}
            </NuxtLink>
          </Card.Title>
          <Card.Description>{{ app.description }}</Card.Description>
        </Card.Header>
        <Card.Content>
          <ul class="m-0 flex list-none flex-wrap gap-2 p-0">
            <li v-for="component in app.components" :key="component">
              <Badge tone="ink" variant="outline">{{ component }}</Badge>
            </li>
          </ul>
        </Card.Content>
        <Card.Footer class="examples-card-foot">
          <NuxtLink
            :to="`/examples/${app.name}`"
            class="font-medium text-primary no-underline hover:underline hover:underline-offset-[0.2em]"
          >
            Open the example
          </NuxtLink>
          <a
            :href="sourceUrl(app.name)"
            target="_blank"
            rel="noopener"
            class="text-tertiary no-underline hover:text-secondary hover:underline hover:underline-offset-[0.2em]"
          >
            View source
          </a>
        </Card.Footer>
      </Card.Root>
    </div>
  </div>
</template>

<style scoped>
/* The core stylesheet paints the card footer's gap (unlayered) and wins
 * the cascade against a layered gap utility; the open/source pair wants
 * a wider berth than the footer's default. */
.examples-card-foot {
  gap: var(--bs-space-4);
}
</style>
