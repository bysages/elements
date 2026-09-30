<script setup lang="ts">
import { computed } from "vue";

import UnghApp from "../../components/apps/github/ungh-app.vue";
import ExampleCanvas from "../../components/example-canvas.vue";
import ExampleHeader from "../../components/example-header.vue";

definePageMeta({ layout: "default", examples: true });

const { locale } = useI18n();

const copy = {
  en: {
    seo: {
      title: "GitHub Profile example",
      description:
        "A contributor's profile page — identity column, an ink-ladder contribution wall drawn from chart cells, and a repository index — built from Elements components.",
    },
    header: {
      kicker: "Example",
      title: "GitHub Profile",
      lede: "DemoMacro's home on GitHub, fed live by the ungh API: the real avatar and repository index — every star, fork, and date below is the account as it stands today.",
    },
  },
  zh: {
    seo: {
      title: "GitHub 个人资料示例",
      description:
        "一份贡献者的资料页——身份栏、以图表格点画出的墨阶贡献墙，以及仓库索引——全部由 Elements 组件组成。",
    },
    header: {
      kicker: "示例",
      title: "GitHub 个人资料",
      lede: "DemoMacro 在 GitHub 的主页，由 ungh API 实时供数：真实的头像与仓库索引——下面的每一颗星、每一个分叉与日期，都是账户今天的原样。",
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
  "app/components/apps/github",
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

    <ExampleCanvas class="p-6">
      <UnghApp />
    </ExampleCanvas>
  </div>
</template>
