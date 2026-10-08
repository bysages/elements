<script setup lang="ts">
import { SCENE_DEFAULT_ACCENT, type ThemeAccent, type ThemeScene } from "@bysages/core";
import { ConfigProvider, Select } from "@bysages/vue";

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
    controls: {
      scene: "Scene",
      pigment: "Pigment",
      auto: "Auto",
      default: "Default",
    },
    header: {
      kicker: "Example",
      title: "Mobile Registers",
      lede: "The open handheld sample station, replicated whole: one index of grouped cells, every entry opening a live page — buttons, forms, lists, badges, progress, dialogs, toasts, a result page and a working tab bar. The same app runs twice, speaking missive 家书 and dispatch 公牍, each frame pinned to its scene and pigment by ConfigProvider.",
    },
  },
  zh: {
    seo: {
      title: "移动端场景示例",
      description:
        "原样复刻的经典移动样例站，一块手机框里跑两遍——missive 家书与 dispatch 公牍，每个页面、对话框与轻提示都可以点。",
    },

    controls: {
      scene: "场景",
      pigment: "颜料",
      auto: "自动",
      default: "默认",
    },
    header: {
      kicker: "示例",
      title: "移动端场景",
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

type MobileScene = Exclude<ThemeScene, "auto">;

type MobileTheme = {
  scene: MobileScene | "auto";
  accent: ThemeAccent | "default";
};

const themes = reactive<MobileTheme[]>([
  { scene: "missive", accent: "feicui" },
  { scene: "dispatch", accent: "jilan" },
]);

const sceneNames: Record<keyof typeof SCENE_DEFAULT_ACCENT, { en: string; zh: string }> = {
  civic: { en: "Civic", zh: "典章" },
  enterprise: { en: "Enterprise", zh: "信笺" },
  studio: { en: "Studio", zh: "雅集" },
  tech: { en: "Tech", zh: "司南" },
  cupertino: { en: "Cupertino", zh: "圆融" },
  expressive: { en: "Expressive", zh: "飞白" },
  fluent: { en: "Fluent", zh: "流水" },
  material: { en: "Material", zh: "格物" },
  sketch: { en: "Sketch", zh: "写意" },
  missive: { en: "Missive", zh: "家书" },
  dispatch: { en: "Dispatch", zh: "公牍" },
  metric: { en: "Metric", zh: "格律" },
  "new-york": { en: "New York", zh: "玄素" },
  archive: { en: "Archive", zh: "卷宗" },
};

const accentNames: Partial<Record<ThemeAccent, { en: string; zh: string }>> = {
  ink: { en: "Ink", zh: "墨" },
  qinghua: { en: "Qinghua", zh: "青花钴蓝" },
  celadon: { en: "Celadon", zh: "青瓷" },
  zhusha: { en: "Zhusha", zh: "朱砂" },
  feicui: { en: "Feicui", zh: "翡翠" },
  jilan: { en: "Jilan", zh: "霁蓝" },
  qingjin: { en: "Qingjin", zh: "青金" },
};

function optionLabel(value: string, name?: { en: string; zh: string }) {
  if (!name) return value;
  return locale.value === "zh" ? `${name.zh} ${name.en}` : name.en;
}

const sceneOptions = computed(() => [
  { label: text.value.controls.auto, value: "auto" },
  ...Object.keys(SCENE_DEFAULT_ACCENT).map((scene) => ({
    label: optionLabel(scene, sceneNames[scene as keyof typeof sceneNames]),
    value: scene,
  })),
]);

const accentOptions = computed(() => [
  { label: text.value.controls.default, value: "default" },
  ...[...new Set(Object.values(SCENE_DEFAULT_ACCENT))].map((accent) => ({
    label: optionLabel(accent, accentNames[accent]),
    value: accent,
  })),
]);

function resolvedScene(scene: MobileTheme["scene"]) {
  return scene === "auto" ? undefined : scene;
}

function resolvedAccent(accent: MobileTheme["accent"]) {
  return accent === "default" ? undefined : accent;
}
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
        <div
          v-for="(theme, index) in themes"
          :key="index"
          class="flex w-[24.375rem] min-w-0 max-w-full flex-col gap-4"
        >
          <div class="grid grid-cols-2 gap-3">
            <Select
              v-model="theme.scene"
              :options="sceneOptions"
              :clearable="false"
              :label="text.controls.scene"
              size="sm"
              class="w-full"
            />
            <Select
              v-model="theme.accent"
              :options="accentOptions"
              :clearable="false"
              :label="text.controls.pigment"
              size="sm"
              class="w-full"
            />
          </div>
          <ConfigProvider
            :scene="resolvedScene(theme.scene)"
            :accent="resolvedAccent(theme.accent)"
            class="min-w-0 max-w-full"
          >
            <Shell />
          </ConfigProvider>
        </div>
      </div>
    </ExampleCanvas>
  </div>
</template>
