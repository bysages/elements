<script setup lang="ts">
import Workbench from "../../components/apps/chat/workbench.vue";
import ExampleCanvas from "../../components/example-canvas.vue";
import ExampleHeader from "../../components/example-header.vue";

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
  <div class="mx-auto w-full max-w-[90rem] px-6 pb-12 pt-8">
    <ExampleHeader
      kicker="Example"
      title="AI Chat Workbench"
      lede="The AI family in conversation: prompts, streamed responses, tool calls, reasoning folds, and suggestion chips. A scripted assistant plays the model locally — the docs assistant on the real site speaks the same parts."
      :source-url="sourceUrl"
      class="mb-7"
    />

    <ExampleCanvas class="mx-auto max-w-3xl p-6">
      <Workbench />
    </ExampleCanvas>
  </div>
</template>
