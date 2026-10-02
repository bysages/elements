<script setup lang="ts">
import DesignWorkbench from "../../components/workbenches/design-workbench.vue";

const { locale } = useI18n();

const copy = {
  en: {
    title: "Design",
    description: "Compose an Elements scene and take its CSS with you.",
  },
  zh: {
    title: "设计",
    description: "组合一个 Elements 场景，并下载对应的 CSS。",
  },
} as const;

useSeoMeta({
  title: () => copy[locale.value as "en" | "zh"].title,
  description: () => copy[locale.value as "en" | "zh"].description,
});

definePageMeta({ layout: "default", gallery: true });
</script>

<template>
  <div class="mx-auto w-full max-w-[90rem] px-6 pb-12 pt-8">
    <ClientOnly>
      <DesignWorkbench :key="locale" />
      <template #fallback>
        <div class="min-h-[32rem] rounded-lg border border-border bg-surface-0" />
      </template>
    </ClientOnly>
  </div>
</template>
