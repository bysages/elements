<script setup lang="ts">
import LandingApp from "../../components/apps/landing/landing-app.vue";
import ExampleCanvas from "../../components/example-canvas.vue";
import ExampleHeader from "../../components/example-header.vue";

definePageMeta({ layout: "default", examples: true });

const { locale } = useI18n();

const copy = {
  en: {
    seo: {
      title: "Marketing Landing example",
      description:
        "A letterpress studio's public face — sticky nav, serif hero, wordmark wall, and a masonry press gallery — built from Elements components.",
    },
    header: {
      kicker: "Example",
      title: "Marketing Landing",
      lede: "A letterpress studio's public face: a sticky nav, a serif hero with a type-specimen plate, a wordmark lattice, and a masonry wall of press cards — every section composed from the library.",
    },
  },
  zh: {
    seo: {
      title: "营销落地页示例",
      description:
        "一家活版印刷工作室的门面——吸顶导航、衬线主视觉、字标墙与瀑布流印刷画廊——全部由 Elements 组件构成。",
    },
    header: {
      kicker: "示例",
      title: "营销落地页",
      lede: "一家活版印刷工作室的门面：吸顶导航、带字版样张的衬线主视觉、字标格阵，以及一面由印刷卡片砌成的瀑布流墙——每一节都由组件库拼成。",
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
  "app/components/apps/landing",
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

    <ExampleCanvas>
      <LandingApp />
    </ExampleCanvas>
  </div>
</template>
