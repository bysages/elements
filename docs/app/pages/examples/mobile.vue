<script setup lang="ts">
import { ConfigProvider } from "@bysages/vue";

import Shell from "../../components/apps/mobile/shell.vue";
import ExampleCanvas from "../../components/example-canvas.vue";
import ExampleHeader from "../../components/example-header.vue";

definePageMeta({ layout: "default", examples: true });

const { locale } = useI18n();

const copy = {
  en: {
    seo: {
      title: "Mobile registers example",
      description:
        "The classic open mobile sample station, replicated whole and live: one interactive phone app running twice — missive 家书 and dispatch 公牍 — every page, dialog and toast clickable.",
    },
    header: {
      kicker: "Example",
      title: "Mobile Registers",
      lede: "The open handheld sample station, replicated whole: one index of grouped cells, every entry opening a live page — buttons, forms, lists, badges, progress, dialogs, toasts, a result page and a working tab bar. The same app runs twice, speaking missive 家书 and dispatch 公牍, each frame pinned to its scene and pigment by ConfigProvider.",
    },
  },
  zh: {
    seo: {
      title: "手机样例站示例",
      description:
        "原样复刻的经典移动样例站，一块手机框里跑两遍——missive 家书与 dispatch 公牍，每个页面、对话框与轻提示都可以点。",
    },
    header: {
      kicker: "示例",
      title: "手机样例站",
      lede: "原样复刻的开放移动样例站：一组分组单元格，每一项都点进真实页面——按钮、表单、列表、徽章、进度条、对话框、轻提示、结果页与标签栏。同一份应用跑两遍，分别说着 missive 家书与 dispatch 公牍，每块屏都由 ConfigProvider 钉在自己的场景与颜料上。",
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
  "app/components/apps/mobile",
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

    <ExampleCanvas class="mx-auto w-full max-w-[56rem] p-6">
      <div class="flex flex-wrap items-start justify-center gap-8">
        <ConfigProvider scene="missive" accent="feicui" class="min-w-0 max-w-full">
          <Shell />
        </ConfigProvider>
        <ConfigProvider scene="dispatch" accent="jilan" class="min-w-0 max-w-full">
          <Shell />
        </ConfigProvider>
      </div>
    </ExampleCanvas>
  </div>
</template>
