<script setup lang="ts">
import MusicApp from "../../components/apps/music/music-app.vue";
import ExampleCanvas from "../../components/example-canvas.vue";
import ExampleHeader from "../../components/example-header.vue";

definePageMeta({ layout: "default", examples: true });

const { locale } = useI18n();

const copy = {
  en: {
    seo: {
      title: "Music example",
      description:
        "A listening room — an album shelf, a track queue, and a now-playing panel with a moving band.",
    },
    header: {
      kicker: "Example",
      title: "Music",
      lede: "A listening room: the album shelf on the left, the queue in the middle, and the now-playing panel where the band moves, volume rides a slider, and tracks hand off to each other.",
    },
  },
  zh: {
    seo: {
      title: "音乐示例",
      description: "一间听音室——专辑架、曲目队列，以及走带行进的正在播放面板。",
    },
    header: {
      kicker: "示例",
      title: "音乐",
      lede: "一间听音室：左边是专辑架，中间是曲目队列，右边是正在播放——走带行进、音量随滑杆起伏、一首唱完自动交棒给下一首。",
    },
  },
} as const;

const text = computed(() => copy[locale.value as "en" | "zh"]);

useSeoMeta({
  title: () => text.value.seo.title,
  description: () => text.value.seo.description,
});
</script>

<template>
  <div class="mx-auto w-full max-w-[90rem] px-6 pb-12 pt-8">
    <ExampleHeader
      :kicker="text.header.kicker"
      :title="text.header.title"
      :lede="text.header.lede"
      class="mb-7"
    />

    <ExampleCanvas>
      <div class="p-6 sm:p-10">
        <MusicApp />
      </div>
    </ExampleCanvas>
  </div>
</template>
