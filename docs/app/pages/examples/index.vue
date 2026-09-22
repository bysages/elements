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
  <div class="examples-page">
    <header class="examples-head">
      <h1 class="examples-title">Examples</h1>
      <p class="examples-lede">
        Complete applications assembled from the library — each one is the real components, styled
        only by the design system, running live in this page.
      </p>
    </header>

    <div class="examples-grid">
      <Card.Root v-for="app in apps" :key="app.name" class="examples-card">
        <Card.Header>
          <Card.Title>
            <NuxtLink :to="`/examples/${app.name}`" class="examples-card-link">
              {{ app.title }}
            </NuxtLink>
          </Card.Title>
          <Card.Description>{{ app.description }}</Card.Description>
        </Card.Header>
        <Card.Content>
          <ul class="examples-tags">
            <li v-for="component in app.components" :key="component">
              <Badge tone="ink" variant="outline">{{ component }}</Badge>
            </li>
          </ul>
        </Card.Content>
        <Card.Footer class="examples-card-foot">
          <NuxtLink :to="`/examples/${app.name}`" class="examples-open">Open the example</NuxtLink>
          <a :href="sourceUrl(app.name)" target="_blank" rel="noopener" class="examples-source">
            View source
          </a>
        </Card.Footer>
      </Card.Root>
    </div>
  </div>
</template>

<style scoped>
.examples-page {
  inline-size: 100%;
  max-inline-size: 90rem;
  margin-inline: auto;
  padding: var(--bs-space-8) var(--bs-space-6) var(--bs-space-12);
}

.examples-head {
  max-inline-size: 44rem;
  margin-block-end: var(--bs-space-8);
}

.examples-title {
  font-family: var(--bs-font-serif);
  font-size: var(--bs-font-size-4xl);
  line-height: var(--bs-line-height-tight);
  margin-block-end: var(--bs-space-3);
}

.examples-lede {
  color: var(--bs-color-text-secondary);
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: var(--bs-space-5);
}

.examples-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--bs-space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.examples-card-foot {
  display: flex;
  align-items: center;
  gap: var(--bs-space-4);
}

.examples-card-link {
  color: inherit;
  text-decoration: none;
}

.examples-card-link:hover {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.examples-open {
  color: var(--bs-color-primary);
  font-weight: var(--bs-font-weight-medium);
  text-decoration: none;
}

.examples-open:hover {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.examples-source {
  color: var(--bs-color-text-tertiary);
  text-decoration: none;
}

.examples-source:hover {
  color: var(--bs-color-text-secondary);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}
</style>
