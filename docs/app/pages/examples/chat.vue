<script setup lang="ts">
import { computed } from "vue";

import Workbench from "../../components/apps/chat/workbench.vue";
import ExampleCanvas from "../../components/example-canvas.vue";
import ExampleHeader from "../../components/example-header.vue";

definePageMeta({ layout: "default", examples: true });

const { locale } = useI18n();

const copy = {
  en: {
    seo: {
      title: "AI Chat Workbench example",
      description:
        "A simulated assistant conversation — streamed responses, tool calls, reasoning, and suggestion chips — composed from the Elements AI family.",
    },
    header: {
      kicker: "Example",
      title: "AI Chat Workbench",
      lede: "The AI family in conversation: prompts, streamed responses, tool calls, reasoning folds, and suggestion chips. A scripted assistant plays the model locally — the docs assistant on the real site speaks the same parts.",
    },
  },
  zh: {
    seo: {
      title: "AI 工作台示例",
      description:
        "一场模拟的助手对话——流式回答、工具调用、推理折叠与建议签，全部由 Elements 的 AI 家族组成。",
    },
    header: {
      kicker: "示例",
      title: "AI 工作台",
      lede: "AI 家族的对话现场：提示输入、流式回答、工具调用、推理折叠与建议签。脚本助手在本地扮演模型——正式站点的文档助手用的正是同一批部件。",
    },
  },
} as const;

const text = computed(() => copy[locale.value as "en" | "zh"]);

useSeoMeta({
  title: () => text.value.seo.title,
  description: () => text.value.seo.description,
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
      :kicker="text.header.kicker"
      :title="text.header.title"
      :lede="text.header.lede"
      :source-url="sourceUrl"
      class="mb-7"
    />

    <ExampleCanvas class="mx-auto max-w-3xl p-6">
      <Workbench />
    </ExampleCanvas>
  </div>
</template>
