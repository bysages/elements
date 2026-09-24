<script setup lang="ts">
import { Link } from "@bysages/vue";

import Workbench from "../../components/apps/chat/workbench.vue";

definePageMeta({ layout: "default", examples: true });

useSeoMeta({
  title: "AI Chat Workbench example",
  description:
    "A simulated assistant conversation — streamed responses, tool calls, reasoning, and suggestion chips — composed from the Elements AI family.",
});

const config = useAppConfig() as {
  github?: { url?: string; branch?: string; rootDir?: string };
};

const sourceUrl = [
  config.github?.url,
  "tree",
  config.github?.branch,
  config.github?.rootDir,
  "app/components/apps/chat",
]
  .filter(Boolean)
  .join("/");
</script>

<template>
  <div class="example-page">
    <header class="example-head">
      <p class="example-kicker">Example</p>
      <h1 class="example-title">AI Chat Workbench</h1>
      <p class="example-lede">
        The AI family in conversation: prompts, streamed responses, tool calls, reasoning folds, and
        suggestion chips. A scripted assistant plays the model locally — the docs assistant on the
        real site speaks the same parts.
      </p>
      <Link :href="sourceUrl" target="_blank" rel="noopener" class="example-source"
        >View source</Link
      >
    </header>

    <Workbench class="chat-stage" />
  </div>
</template>

<style scoped>
.example-page {
  inline-size: 100%;
  max-inline-size: 90rem;
  margin-inline: auto;
  padding: var(--bs-space-8) var(--bs-space-6) var(--bs-space-12);
}

.example-head {
  max-inline-size: 44rem;
  margin-block-end: var(--bs-space-7);
}

.example-kicker {
  margin: 0 0 var(--bs-space-2);
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
  letter-spacing: var(--bs-tracking-label);
  text-transform: uppercase;
}

.example-title {
  font-family: var(--bs-font-serif);
  font-size: var(--bs-font-size-4xl);
  line-height: var(--bs-line-height-tight);
  margin: 0 0 var(--bs-space-3);
}

.example-lede {
  color: var(--bs-color-text-secondary);
  margin: 0 0 var(--bs-space-3);
}

.example-source {
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
  text-decoration: none;
}

.example-source:hover {
  color: var(--bs-color-text-secondary);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.chat-stage {
  max-inline-size: 46rem;
}
</style>
