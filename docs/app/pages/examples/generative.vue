<script setup lang="ts">
import { computed } from "vue";

import Studio from "../../components/apps/generative/studio.vue";
import ExampleCanvas from "../../components/example-canvas.vue";
import ExampleHeader from "../../components/example-header.vue";

definePageMeta({ layout: "default", examples: true });

const { locale } = useI18n();

const copy = {
  en: {
    seo: {
      title: "Generative UI example",
      description:
        "Prompt to interface: a recorded spec stream of Elements components, rendered live inside the catalog's guardrails.",
    },
    header: {
      kicker: "Example",
      title: "Generative UI",
      lede: "The catalog speaks JSON. Type a prompt and a recorded spec stream composes Elements components — rendered live, bound to state, always inside the guardrails.",
    },
  },
  zh: {
    seo: {
      title: "生成式界面示例",
      description:
        "从提示词到界面：一段回放的规格流实时搭出 Elements 组件的界面，可交互、绑定状态，只使用目录里的组件。",
    },
    header: {
      kicker: "示例",
      title: "生成式界面",
      lede: "输入一句提示词，一段回放的规格流把 Elements 组件的界面逐条搭出来——可交互、绑定状态，且只使用目录里的组件。",
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
  "app/components/apps/generative",
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

    <ExampleCanvas class="mx-auto max-w-4xl p-6">
      <Studio />
    </ExampleCanvas>
  </div>
</template>
