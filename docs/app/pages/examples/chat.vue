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
        "A scripted conversation in the Elements AI family — streamed answers, reasoning folds, suggestion chips, and interfaces rendered inline, all composed locally.",
    },
    header: {
      kicker: "Example",
      title: "AI Chat Workbench",
      lede: "The AI family in conversation: prompts, streamed responses, reasoning folds, and suggestion chips. The demo speaks a recorded script — no gateway, nothing leaves the page.",
    },
  },
  zh: {
    seo: {
      title: "AI 工作台示例",
      description:
        "Elements AI 家族的对话演示：流式回答、推理折叠与建议签，回答里直接渲染界面，全程本地生成。",
    },
    header: {
      kicker: "示例",
      title: "AI 工作台",
      lede: "AI 家族的对话现场：提示输入、流式回答、推理折叠与建议签。演示走本地脚本——不连网关，内容不离开页面。",
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

    <ExampleCanvas class="mx-auto h-[min(82dvh,56rem)] p-0">
      <Workbench :key="locale" />
    </ExampleCanvas>
  </div>
</template>
